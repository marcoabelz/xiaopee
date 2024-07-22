// import { ProductType } from "@/app/(withNavbar)/products/page";
import { ProductType } from "../../types/ProductType";
import { database } from "../config";

class ProductModel {
  static async findAll(search?: string, page: number = 1, limit: number = 4) {
    const query = search ? { name: new RegExp(search, "i") } : {};
    const skip = (page - 1) * limit;

    // console.log("Query: ", query, "Skip: ", skip, "Limit: ", limit);

    const result = await database.collection("products").find(query).skip(skip).limit(limit).toArray();
    return result as ProductType[];
  }

  static async findFewData() {
    const result = await database.collection("products").find().limit(10).toArray();
    return result as ProductModel;
  }

  static async getProductBySlug(slug: string) {
    const result = await database.collection("products").findOne({ slug });
    return result;
  }
}

export default ProductModel;
