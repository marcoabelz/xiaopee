"use client";

import React, { useEffect, useState } from "react";

import RemoveWishlist from "@/components/RemoveWishlist";
import WishlistCard from "@/components/WishlistCard";
import Product from "../products/page";

export default function WishlistProduct() {
  const [wishlists, setWishlists] = useState([]);

  const fetchData = async () => {
    try {
      let response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
        // let response = await fetch("http://localhost:3000/api/wishlist", {
        method: "GET",
        cache: "no-store",
      });
      const result = await response.json();
      setWishlists(result);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlists.map((el, index) => (
              <WishlistCard item={el} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
