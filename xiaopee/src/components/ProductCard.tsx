import AddWishlist from "./AddWishlist";

// import { ProductType } from "@/app/(withNavbar)/products/page";
import { ProductType } from "../types/ProductType";

export default function ProductCard({ item }: { item: ProductType }) {

  return (
    <>
      {/* <a href=""> */}
      <div className="card bg-base-300 shadow-xl p-5">
        <figure>
          <img src={item.thumbnail} alt="Shoes" />
        </figure>
        <div className="card-body px-1">
          <h2 className="card-title">
            {item.name}
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <div className="description">
            <p>{item.excerpt}</p>
          </div>
          <div className="price">
            <p>Rp. {item.price}</p>
          </div>
          <div className="card-actions justify-end">
            {item.tags.map((el, index) => (
              <div className="badge badge-outline" key={index}>
                {el}
              </div>
            ))}
          </div>
        </div>

        <div className="div flex" style={{ justifyContent: "space-between" }}>
          <a href={`/products/${item.slug}`} className="btn bg-gray-700 text-center" style={{ width: 150 }}>
            See Detail
          </a>
          <AddWishlist productId={item._id} />
        </div>
      </div>
      {/* </a> */}
    </>
  );
}
