"use client";

import { TypeWishlist } from "@/types/WishlistType";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function RemoveWishlist({ wishlistId }: { wishlistId: string }) {
  const router = useRouter();
  const removeWishlistHandler = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/wishlist/${wishlistId}`, {
      // const response = await fetch(`http://localhost:3000/api/wishlist/${wishlistId}`, {
      method: "DELETE",
      cache: "no-store",
    });
    if (response.ok) {
      Swal.fire({
        title: "Success!",
        text: "Item successfully remove from wishlist",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/products");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to add item to wishlist",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <button onClick={removeWishlistHandler} className="btn btn-secondary">
        Remove
      </button>
    </>
  );
}
