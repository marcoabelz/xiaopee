import React from "react";

export default function Banner() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://img.freepik.com/free-vector/black-background-with-focus-spot-light_1017-27230.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Xiaopee</h1>
            <p className="mb-5">Limited Time Offer: Up to 50% Off on All Items! Do not Miss Out!</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
