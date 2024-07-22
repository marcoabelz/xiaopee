import WishlistModel from "@/db/models/Wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const result = await WishlistModel.delete(new ObjectId(id));

    return NextResponse.json({ message: `${result.product.name} success removed from wishlist!` });
  } catch (error) {
    console.error("Error in DELETE method:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
