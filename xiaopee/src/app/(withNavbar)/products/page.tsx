"use client";

import React from "react";
import ProductCard from "../../../components/ProductCard";
import Banner from "@/components/Banner";
import { useState, useEffect } from "react";

import { ProductType } from "../../../types/ProductType";
import Search from "@/components/Search";
import { useSearchParams } from "next/navigation";

import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";
// import InfiniteScroll from "react-infinite-scroll-component";

export default function Product() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const [products, setProducts] = useState<ProductType[]>([]);

  //pagination
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData(true);
  }, [searchParams]);

  const fetchData = async (reset = false) => {
    try {
      if (reset) {
        setProducts([]);
        setPage(1);
        setHasMore(true);
      }

      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products?search=${encodeURIComponent(searchValue)}&page=${reset ? 1 : page}&limit=4`, {
        // const response = await fetch(`http://localhost:3000/api/products?search=${encodeURIComponent(searchValue)}&page=${reset ? 1 : page}&limit=4`, {
        cache: "no-store",
      });
      const data = await response.json();
      // console.log(data.data, "dataaa");

      if (response.ok) {
        if (reset) {
          setProducts(data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...data]);
        }

        if (data.length < 4) {
          setHasMore(false);
        }

        Swal.close();
      } else {
        throw new Error("Failed to fetch produtcs");
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  function loadMoreProducts() {
    setPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    if (page > 1) {
      fetchData(); // Fetch more data when page changes
    }
  }, [page]);

  return (
    <>
      <div className="container">
        <Banner />
        <Search />
        <InfiniteScroll dataLength={products.length} next={loadMoreProducts} hasMore={hasMore} loader={<h4>Loading...</h4>}>
          <div className="card-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 m-5">{products && products.map((el: ProductType, index: number) => <ProductCard item={el} key={index} />)}</div>
        </InfiniteScroll>
      </div>
    </>
  );
}
