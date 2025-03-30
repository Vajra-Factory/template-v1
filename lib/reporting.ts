import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import { createCanvas } from "canvas";
import { PDFDocument, rgb } from "pdf-lib";
import { format } from "date-fns";

interface ReportData {
  gpuUsage: number[];
  fps: number[];
  frameTime: number[];
  timestamps: Date[];
  totalFrames: number;
  averageFPS: number;
  cloudCost: number;
}

export class ReportingService {
  private static instance: ReportingService;
  private gmail: any;

  private constructor() {
    // Initialize Gmail API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GMAIL_CLIENT_EMAIL,
        private_key: process.env.GMAIL_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/gmail.send"],
    });

    this.gmail = google.gmail({ version: "v1", auth });
  }

  public static getInstance(): ReportingService {
    if (!ReportingService.instance) {
      ReportingService.instance = new ReportingService();
    }
    return ReportingService.instance;
  }

  async generateReport(userId: string, period: "DAILY" | "WEEKLY" | "MONTHLY" | "QUARTERLY"): Promise<void> {
    try {
      // Get telemetry data for the period
      const data = await this.getTelemetryData(userId, period);
      
      // Generate performance graphs
      const graphs = await this.generateGraphs(data);
      
      // Create PDF report
      const pdfBuffer = await this.createPDFReport(data, graphs);
      
      // Store report in database
      const report = await prisma.report.create({
        data: {
          userId,
          type: "PERFORMANCE",
          period,
          data: data as any,
          pdfUrl: await this.uploadPDF(pdfBuffer),
          status: "COMPLETED",
          sentAt: new Date(),
        },
      });
      
      // Send report via email
      await this.sendReportEmail(userId, report);
    } catch (error) {
      console.error("Generate report error:", error);
      throw error;
    }
  }

  private async getTelemetryData(userId: string, period: string): Promise<ReportData> {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "DAILY":
        startDate = new Date(now.setDate(now.getDate() - 1));
        break;
      case "WEEKLY":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "MONTHLY":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "QUARTERLY":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        throw new Error("Invalid period");
    }

    const telemetry = await prisma.telemetry.findMany({
      where: {
        userId,
        timestamp: {
          gte: startDate,
          lte: new Date(),
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    return {
      gpuUsage: telemetry.map((t) => t.gpuUsage),
      fps: telemetry.map((t) => t.fps),
      frameTime: telemetry.map((t) => t.frameTime),
      timestamps: telemetry.map((t) => t.timestamp),
      totalFrames: telemetry.length,
      averageFPS: telemetry.reduce((acc, t) => acc + t.fps, 0) / telemetry.length,
      cloudCost: telemetry.reduce((acc, t) => acc + (t.cloudCost ?? 0), 0),
    };
  }

  private async generateGraphs(data: ReportData): Promise<Buffer[]> {
    const graphs: Buffer[] = [];
    
    // Generate GPU Usage Graph
    const gpuCanvas = createCanvas(800, 400);
    const gpuCtx = gpuCanvas.getContext("2d");
    this.drawLineGraph(gpuCtx, data.gpuUsage, "GPU Usage (%)");
    graphs.push(gpuCanvas.toBuffer());
    
    // Generate FPS Graph
    const fpsCanvas = createCanvas(800, 400);
    const fpsCtx = fpsCanvas.getContext("2d");
    this.drawLineGraph(fpsCtx, data.fps, "FPS");
    graphs.push(fpsCanvas.toBuffer());
    
    return graphs;
  }

  private drawLineGraph(ctx: any, data: number[], label: string): void {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    
    // Draw axes
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw data
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    data.forEach((value, i) => {
      const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
      const y = height - padding - (value * (height - 2 * padding)) / 100;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Draw label
    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText(label, padding, padding - 10);
  }

  private async createPDFReport(data: ReportData, graphs: Buffer[]): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    
    // Add title
    page.drawText("Performance Report", {
      x: 50,
      y: page.getHeight() - 50,
      size: 24,
    });
    
    // Add graphs
    graphs.forEach((graph, i) => {
      const image = pdfDoc.embedPng(graph);
      page.drawImage(image, {
        x: 50,
        y: page.getHeight() - 200 - (i * 450),
        width: 500,
        height: 250,
      });
    });
    
    // Add statistics
    const stats = [
      `Total Frames: ${data.totalFrames}`,
      `Average FPS: ${data.averageFPS.toFixed(2)}`,
      `Cloud Cost: ₹${data.cloudCost.toFixed(2)}`,
    ];
    
    stats.forEach((stat, i) => {
      page.drawText(stat, {
        x: 50,
        y: page.getHeight() - 600 - (i * 20),
        size: 12,
      });
    });
    
    return await pdfDoc.save();
  }

  private async uploadPDF(buffer: Buffer): Promise<string> {
    // TODO: Implement PDF upload to Cloudflare R2
    return "https://example.com/report.pdf";
  }

  private async sendReportEmail(userId: string, report: any): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user?.email) {
      throw new Error("User email not found");
    }

    const message = [
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      `To: ${user.email}`,
      "Subject: Your OverDrift Performance Report",
      "",
      `<h1>Performance Report</h1>
       <p>Hello ${user.name || "there"},</p>
       <p>Here's your ${report.period.toLowerCase()} performance report for OverDrift.</p>
       <p>You can view the full report at: <a href="${report.pdfUrl}">${report.pdfUrl}</a></p>
       <p>Best regards,<br>The OverDrift Team</p>`,
    ].join("\r\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await this.gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });
  }
} 