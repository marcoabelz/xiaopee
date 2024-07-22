import AddWishlist from "./AddWishlist";

import { ProductType } from "../types/ProductType";

export default function ProductCardLanding({ item }: { item: ProductType }) {

  return (
    <>
      <div className="card bg-base-300 shadow-xl p-5">
        <figure style={{ height: "300px" }}>
          <img src={item.images[0]} alt="Shoes" />
        </figure>
        <div className="card-body px-1">
          <h2 className="card-title">{item.name}</h2>
          <div className="description">
            <p>{item.excerpt}</p>
          </div>
          <div className="price">
            <p>Rp. {item.price}</p>
          </div>
          <div className="card-actions justify-end">
            {item.tags.map((el: string, index: number) => (
              <div className="badge badge-outline" key={index}>
                {el}
              </div>
            ))}
          </div>
        </div>
        <div className="div flex" style={{ justifyContent: "space-between" }}>
          <a href={`/products/${item.slug}`} className="btn bg-gray-700 text-center" style={{ width: 300 }}>
            See Detail
          </a>
        </div>
      </div>
    </>
  );
}
