import { formatZodError } from "../../../db/helpers/zod";
import UserModel, { User } from "../../../db/models/User";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {

    const body: User = await request.json();

    if (body.password.length < 5) {
      return NextResponse.json(
        {
          message: "Password min 5 character",
        },
        {
          status: 400,
        }
      );
    }

    const user = await UserModel.findByEmail(body.email);
    if (user) {
      return NextResponse.json(
        {
          message: "Email already taken!",
        },
        {
          status: 401,
        }
      );
    }

    const result = await UserModel.register({
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    });
    // console.log(result);

    return NextResponse.json(
      {
        message: `${result.email} success registered`,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          // message: formatZodError(error),
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
