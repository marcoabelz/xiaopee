import { ProductType } from "@/types/ProductType";
import RemoveWishlist from "./RemoveWishlist";

export default function WishlistCard({ item }: { item: ProductType }) {
  return (
    <>
      <div key={item.id} className="card bg-base-100 shadow-xl">
        <figure>
          <img src={item.product.thumbnail} alt={item.name} className="w-full h-48 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.product.name}</h2>
          <p>{item.product.excerpt}</p>
          <p>Rp. {item.product.price}</p>
          <div className="card-actions justify-end">
            <RemoveWishlist wishlistId={item._id} />
          </div>
        </div>
      </div>
    </>
  );
}
