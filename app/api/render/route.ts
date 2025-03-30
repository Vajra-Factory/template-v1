import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CloudRenderService } from "@/lib/cloud-render";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await rateLimit(ip);
    if (!success) {
      return new NextResponse("Too Many Requests", { status: 429 });
    }

    // Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { settings, priority = "NORMAL", type = "REALTIME" } = body;

    // Create render job
    const job = await prisma.renderJob.create({
      data: {
        userId: session.user.id,
        status: "PENDING",
        priority,
        type,
        settings,
        startTime: new Date(),
      },
    });

    // Start cloud rendering
    const cloudService = CloudRenderService.getInstance();
    const offloadResult = await cloudService.offloadRender({
      userId: session.user.id,
      jobId: job.id,
      settings,
    });

    if (!offloadResult) {
      return new NextResponse("Failed to start render job", { status: 500 });
    }

    return NextResponse.json({
      success: true,
      jobId: job.id,
    });
  } catch (error) {
    console.error("Render job error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get job ID from query params
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return new NextResponse("Job ID is required", { status: 400 });
    }

    // Get render status
    const cloudService = CloudRenderService.getInstance();
    const status = await cloudService.getRenderStatus(jobId);

    return NextResponse.json(status);
  } catch (error) {
    console.error("Get render status error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 