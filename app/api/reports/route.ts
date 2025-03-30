import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReportingService } from "@/lib/reporting";
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
    const { period } = body;

    if (!["DAILY", "WEEKLY", "MONTHLY", "QUARTERLY"].includes(period)) {
      return new NextResponse("Invalid period", { status: 400 });
    }

    // Generate report
    const reportingService = ReportingService.getInstance();
    await reportingService.generateReport(session.user.id, period);

    return NextResponse.json({
      success: true,
      message: "Report generation started",
    });
  } catch (error) {
    console.error("Generate report error:", error);
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

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period");
    const type = searchParams.get("type");

    // Build query
    const where: any = {
      userId: session.user.id,
    };

    if (period) {
      where.period = period;
    }

    if (type) {
      where.type = type;
    }

    // Get reports
    const reports = await prisma.report.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: 10, // Limit to last 10 reports
    });

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Get reports error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 