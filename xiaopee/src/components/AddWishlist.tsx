"use client";

import { TypeWishlist } from "@/types/WishlistType";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddWishlist({ productId }: { productId: string }) {
  const router = useRouter();

  const addWishlistHandler = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlist", {
        // const response = await fetch("http://localhost:3000/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Item successfully added to wishlist",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/wishlist");
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add item to wishlist",
          icon: "error",
          confirmButtonText: "OK",
        });
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <button onClick={addWishlistHandler} className="btn bg-gray-700 text-center" style={{ width: 100 }}>
        Add To Wishlist
      </button>
    </>
  );
}
