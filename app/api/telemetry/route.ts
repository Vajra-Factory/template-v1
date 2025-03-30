import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { detectGPU } from '@/lib/gpu';
import { rateLimit } from '@/lib/rate-limit';

export async function GET(req: Request) {
  try {
    // Authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get latest telemetry data
    const telemetry = await prisma.telemetry.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    return NextResponse.json({ telemetry });
  } catch (error) {
    console.error("Telemetry fetch error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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
    const {
      gpuUsage,
      vramUsage,
      gpuTemp,
      cpuUsage,
      cpuTemp,
      cpuClock,
      ramUsage,
      fps,
      frameTime,
      resolution,
      isCloudRendered,
      cloudProvider,
    } = body;

    // Detect GPU type
    const gpuType = await detectGPU();

    // Store telemetry data
    const telemetry = await prisma.telemetry.create({
      data: {
        userId: session.user.id,
        gpuUsage,
        vramUsage,
        gpuTemp,
        gpuType,
        cpuUsage,
        cpuTemp,
        cpuClock,
        ramUsage,
        fps,
        frameTime,
        resolution,
        isCloudRendered,
        cloudProvider,
      },
    });

    // Check if we need to offload to cloud
    const shouldOffload = await checkOffloadNeeded(telemetry);

    return NextResponse.json({
      success: true,
      telemetry,
      shouldOffload,
    });
  } catch (error) {
    console.error("Telemetry error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function checkOffloadNeeded(telemetry: any) {
  // Define thresholds for cloud offloading
  const THRESHOLDS = {
    GPU_USAGE: 90, // 90% GPU usage
    VRAM_USAGE: 85, // 85% VRAM usage
    FPS: 30, // Below 30 FPS
    FRAME_TIME: 33, // Above 33ms frame time
  };

  // Check if any thresholds are exceeded
  const shouldOffload =
    telemetry.gpuUsage > THRESHOLDS.GPU_USAGE ||
    telemetry.vramUsage > THRESHOLDS.VRAM_USAGE ||
    telemetry.fps < THRESHOLDS.FPS ||
    telemetry.frameTime > THRESHOLDS.FRAME_TIME;

  return shouldOffload;
} 