// import { NewUserInput } from "@/app/(withNavbar)/register/page";
import { database } from "../config";
import { z } from "zod";
import { hashPassword } from "../helpers/bcrypt.js";
import { ObjectId } from "mongodb";
import { NewUserSchema, NewUserType } from "@/types/UserType";

export type User = z.infer<typeof NewUserSchema>;

class UserModel {
  static async register(user: User) {
    user.password = hashPassword(user.password);

    const newUser = await database.collection("users").insertOne(user);
    const result = await database.collection("users").findOne({ _id: new ObjectId(newUser.insertedId) });
    return result;
  }

  static async findByEmail(email: string) {
    const result = await database.collection("users").findOne({ email });
    return result;
  }
}

export default UserModel;
