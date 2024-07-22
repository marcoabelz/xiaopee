"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    // router.push(process.env.BASE_URL + `/products?search=${search}`);
    router.push(`/products?search=${search}`);
  }, [search, router]);

  return (
    <>
      <div className="ps-5 pt-5 form-control w-80">
        <input value={search} onChange={(e) => setSearch(e.target.value)} name="search" type="text" placeholder="Search by name" className="input input-bordered" />
      </div>
    </>
  );
}
