import { ObjectId } from "mongodb";
import { z } from "zod";

export const TypeWishlistSchema = z.object({
  productId: z.string(),
});

export type TypeWishlist = {
  userId: ObjectId;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
};
