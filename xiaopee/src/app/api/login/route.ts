import UserModel, { User } from "../../../db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { LoginUserType, LoginUserSchema } from "../../../types/UserType";
import { comparePassword } from "../../../db/helpers/bcrypt.js";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { formatZodError } from "@/db/helpers/zod";

export async function POST(request: NextRequest) {
  try {
    const body: LoginUserType = await request.json();

    const parsedBody = LoginUserSchema.parse(body);

    const user = await UserModel.findByEmail(parsedBody.email);
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email/password",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordMatch = await comparePassword(parsedBody.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          message: "Invalid email/password",
        },
        {
          status: 401,
        }
      );
    }

    const access_token = signToken({
      _id: user._id,
    });

    cookies().set("Authorization", `Bearer ${access_token}`);

    return NextResponse.json({
      access_token: access_token,
    });
  } catch (error: any) {
    if (error.message === "Unexpected end of JSON input") {
      return NextResponse.json(
        {
          message: "Email or password is required",
        },
        {
          status: 400,
        }
      );
    }

    // Error Zod
    if (error instanceof ZodError) {
      return NextResponse.json({ message: formatZodError(error) }, { status: 400 });
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
