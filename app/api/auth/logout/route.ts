export const dynamic = "force-dynamic";

import { signOut } from "@/lib/actions/auth.actions";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut();
    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
