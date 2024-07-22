"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent } from "react";
import { NewUserType } from "../../types/UserType";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();

  const [userInput, setUserInput] = useState<NewUserType>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // const res = await fetch("http://localhost:3000/api/register", {
    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });

    if (!res.ok) {
      // console.log(await res.json(), "json");

      const { message } = await res.json();
      setError(message);
    } else {
      Swal.fire({
        title: "Success!",
        text: "New user registred!",
        icon: "success",
        confirmButtonText: "OK",
      });
      router.push("/login");
    }
  };

  return (
    <div
      className="hero min-h-screen flex items-center justify-center bg-base-200"
      style={{ backgroundImage: "url(https://image.slidesdocs.com/responsive-images/background/business-e-shopping-powerpoint-background_0669a90557__960_540.jpg)" }}
    >
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Name" className="input input-bordered" required name="name" value={userInput.name} onChange={onChangeInputHandler} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input type="text" placeholder="Username" className="input input-bordered" required name="username" value={userInput.username} onChange={onChangeInputHandler} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" placeholder="Email" className="input input-bordered" required name="email" value={userInput.email} onChange={onChangeInputHandler} />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Password" className="input input-bordered" required name="password" value={userInput.password} onChange={onChangeInputHandler} />
            <label className="label mt-6">
              <a href="/login" className="label-text-alt link link-hover" style={{ color: "blue" }}>
                Go to login
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
