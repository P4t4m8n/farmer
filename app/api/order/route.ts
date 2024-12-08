import { AppError } from "@/lib/utils/AppError";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { order } = await req.json();
  } catch (error) {
    AppError.create(`${error}`, 500);
  }
}
