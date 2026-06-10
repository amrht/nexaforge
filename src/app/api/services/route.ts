import { NextRequest, NextResponse } from "next/server";
import { services } from "@/lib/services-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const limitParam = searchParams.get("limit");

  let result = [...services];

  if (category) {
    result = result.filter((s) => s.category === category);
  }

  if (limitParam) {
    const limit = parseInt(limitParam, 10);
    if (!isNaN(limit) && limit > 0) {
      result = result.slice(0, limit);
    }
  }

  return NextResponse.json(
    { data: result, count: result.length },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
