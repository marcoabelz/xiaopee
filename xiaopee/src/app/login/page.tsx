import ClientFlashComponent from "@/components/ClientFlashComponent";
import { LoginUserSchema } from "@/types/UserType";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { z } from "zod";

export default function Login() {
  // Di login page
  const submitHandler = async (formData: FormData) => {
    "use server";
    try {
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const sanitazedData = await LoginUserSchema.safeParseAsync(data);

      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/login", {
        // const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(sanitazedData.data),
      });

      const result = (await response.json()) as { message?: string; access_token?: string };

      if (!response.ok) {
        redirect(`/login?error=${result.message}`);
      }

      cookies().set("Authorization", `Bearer ${result.access_token}`);
      redirect("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return redirect("/login?error=" + encodeURIComponent(error.errors[0].message));
      }
      throw error;
    }
  };

  return (
    <div
      className="hero min-h-screen flex items-center justify-center bg-base-200"
      style={{
        backgroundImage: "url(https://image.slidesdocs.com/responsive-images/background/business-e-shopping-powerpoint-background_0669a90557__960_540.jpg)",
      }}
    >
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form action={submitHandler} className="space-y-4">
          <ClientFlashComponent />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered" name="email" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" className="input input-bordered" name="password" />
          </div>
          <p>
            Did not have account? Register{" "}
            <a href="/register" style={{ color: "blue" }}>
              here
            </a>
          </p>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
