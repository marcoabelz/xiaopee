import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET_KEY);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

export const verifyTokenJose = async (token: string) => {
  const secretKey = new TextEncoder().encode(JWT_SECRET_KEY);
  const result = await jose.jwtVerify(token, secretKey);
  return result.payload;
};
