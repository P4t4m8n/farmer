import { AppError } from "@/lib/utils/AppError";
import { deliveryUtil } from "@/lib/utils/delivery.util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get("city");

    const deliveries = deliveryUtil.getDeliveryDates({ city: city || "" });
    return NextResponse.json(deliveries, { status: 200 });
  } catch (error) {
    const err = AppError.create(
      `Error getting delivery dates ${error}`,
      500,
      true
    );

    return NextResponse.json(
      { message: err.message },
      { status: err.statusCode }
    );
  }
}
