import WishlistModel from "@/db/models/Wishlist";
import { TypeWishlistSchema } from "@/types/WishlistType";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { productId } = TypeWishlistSchema.parse(body);

    const userId = request.headers.get("_id");

    if (!userId) {
      return NextResponse.json(
        {
          message: "Not Authorized",
        },
        {
          status: 403,
        }
      );
    }

    const wishlistItem = {
      productId,
      userId,
    };

    const wishlist = await WishlistModel.create(wishlistItem);
    return NextResponse.json({
      message: "Wishlist added!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "formatZodError(error)",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // console.log("masuk route");
    const userId = request.headers.get("_id");
    // console.log(userId, "userid");

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const result = await WishlistModel.findAll(userId);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
  }
}

