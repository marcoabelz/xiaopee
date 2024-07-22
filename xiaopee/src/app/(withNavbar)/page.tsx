import React from "react";

import Banner from "../../components/Banner";
import DetailInfoEcommerce from "@/components/DetailInfoEcommerce";
import ProductCardLanding from "@/components/ProductCardLanding";
// import { ProductType } from "./products/page";
import { ProductType } from "../../types/ProductType";

export default async function Home() {

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/landing", {
    // const res = await fetch("http://localhost:3000/api/landing", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <>
      <div className="container">
        <div className="container">
          <Banner />
          <div className="" style={{ overflow: "hidden" }}>
            <div className="slider flex gap-5 p-5 cols-3" style={{ overflowX: "scroll" }}>
              {data.map((el: ProductType) => (
                <ProductCardLanding item={el} key={el.id} />
              ))}
            </div>
          </div>
          <div className="see-all-product pb-5" style={{ textAlign: "center" }}>
            <a href="/products">See all product</a>
          </div>
          <DetailInfoEcommerce />
        </div>
      </div>
    </>
  );
}
