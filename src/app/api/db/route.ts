import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const [departments, staff, programs, events, news, research] = await Promise.all([
    prisma.department.count(),
    prisma.staff.count(),
    prisma.program.count(),
    prisma.event.count(),
    prisma.newsArticle.count(),
    prisma.researchProject.count(),
  ]);

  return NextResponse.json({
    ok: true,
    counts: { departments, staff, programs, events, news, research },
  });
}
