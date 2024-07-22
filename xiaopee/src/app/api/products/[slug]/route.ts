import ProductModel from "../../../../db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const data = await ProductModel.getProductBySlug(slug);
    if (!data) {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(data, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
