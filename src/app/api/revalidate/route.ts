import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { apiError } from "@/lib/api-error";

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return apiError("Invalid secret", "UNAUTHORIZED", 401);
  }

  let body: { path?: string; tag?: string };
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", "INVALID_JSON", 400);
  }

  if (body.path) {
    revalidatePath(body.path);
  }

  if (body.tag) {
    revalidateTag(body.tag, "max");
  }

  if (!body.path && !body.tag) {
    revalidatePath("/case-studies");
    revalidatePath("/blog");
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
