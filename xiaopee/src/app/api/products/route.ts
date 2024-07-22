import ProductModel from "../../../db/models/Product";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    //pagination
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";

    const page = parseInt(searchParams.get("page") || "1", 10);

    const limit = parseInt(searchParams.get("limit") || "4", 10);

    const data = await ProductModel.findAll(search, page, limit);

    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
