import { NextResponse } from "next/server";

export function apiError(
  message: string,
  code: string,
  status: number,
) {
  return NextResponse.json({ error: message, code }, { status });
}
