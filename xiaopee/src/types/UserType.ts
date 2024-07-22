import { z } from "zod";
export const NewUserSchema = z.object({
  name: z.string().optional(),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string(),
});

export type NewUserType = z.infer<typeof NewUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string({ message: "Email is required" }).email({ message: "Invalid email format" }),
  password: z.string({ message: "Password is required" }).min(5),
});

export type LoginUserType = z.infer<typeof LoginUserSchema>;
