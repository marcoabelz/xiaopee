import ProductModel from "../../../db/models/Product";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await ProductModel.findFewData();
    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
