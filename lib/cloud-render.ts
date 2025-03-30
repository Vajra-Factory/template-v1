import { prisma } from "@/lib/prisma";

interface CloudRenderOptions {
  userId: string;
  jobId: string;
  settings: {
    resolution: string;
    quality: number;
    frameCount: number;
    format: string;
  };
}

export class CloudRenderService {
  private static instance: CloudRenderService;
  private groqApiKey: string;
  private groqEndpoint: string;

  private constructor() {
    this.groqApiKey = process.env.GROQ_API_KEY!;
    this.groqEndpoint = process.env.GROQ_ENDPOINT!;
  }

  public static getInstance(): CloudRenderService {
    if (!CloudRenderService.instance) {
      CloudRenderService.instance = new CloudRenderService();
    }
    return CloudRenderService.instance;
  }

  async offloadRender(options: CloudRenderOptions): Promise<boolean> {
    try {
      // Update job status
      await prisma.renderJob.update({
        where: { id: options.jobId },
        data: {
          status: "PROCESSING",
          gpuType: "cloud",
          cloudProvider: "groq",
        },
      });

      // Prepare render request
      const request = {
        model: "llama-3",
        messages: [
          {
            role: "system",
            content: "You are a GPU rendering optimization agent.",
          },
          {
            role: "user",
            content: JSON.stringify({
              type: "render",
              settings: options.settings,
            }),
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      };

      // Send request to Groq Cloud
      const response = await fetch(this.groqEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.groqApiKey}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`);
      }

      const result = await response.json();

      // Update job with results
      await prisma.renderJob.update({
        where: { id: options.jobId },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          outputUrl: result.outputUrl,
          logs: JSON.stringify(result.logs),
          cloudCost: result.cost,
        },
      });

      return true;
    } catch (error) {
      console.error("Cloud render error:", error);

      // Update job status on failure
      await prisma.renderJob.update({
        where: { id: options.jobId },
        data: {
          status: "FAILED",
          completedAt: new Date(),
          logs: JSON.stringify({ error: error.message }),
        },
      });

      return false;
    }
  }

  async getRenderStatus(jobId: string): Promise<{
    status: string;
    progress: number;
    outputUrl?: string;
  }> {
    try {
      const job = await prisma.renderJob.findUnique({
        where: { id: jobId },
      });

      if (!job) {
        throw new Error("Render job not found");
      }

      return {
        status: job.status,
        progress: this.calculateProgress(job),
        outputUrl: job.outputUrl ?? undefined,
      };
    } catch (error) {
      console.error("Get render status error:", error);
      throw error;
    }
  }

  private calculateProgress(job: any): number {
    if (job.status === "COMPLETED") return 100;
    if (job.status === "FAILED") return 0;
    if (job.status === "PENDING") return 0;

    // Calculate progress based on start and end times
    if (job.startTime && job.endTime) {
      const total = job.endTime.getTime() - job.startTime.getTime();
      const elapsed = Date.now() - job.startTime.getTime();
      return Math.min(Math.round((elapsed / total) * 100), 99);
    }

    return 0;
  }
} 