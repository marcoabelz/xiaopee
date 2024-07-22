import { database } from "../config";
import { TypeWishlist } from "../../types/WishlistType";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

class WishlistModel {
  static async create(wishlist: { productId: string; userId: string }) {
    const newWishlist = await database.collection("wishlists").insertOne({
      productId: new ObjectId(wishlist.productId),
      userId: new ObjectId(wishlist.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newWishlist;
  }

  static async findAll(userId: string): Promise<TypeWishlist[]> {
    const result = await database
      .collection("wishlists")
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
      ])
      .toArray();
    // console.log(result, "model");

    return result as TypeWishlist[];
    // return NextResponse.json(result);
  }

  static async delete(id: ObjectId) {
    const result = await database
      .collection("wishlists")
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
      ])
      .toArray();
    await database.collection("wishlists").deleteOne({ _id: id });
    return result[0];
  }
}

export default WishlistModel;
