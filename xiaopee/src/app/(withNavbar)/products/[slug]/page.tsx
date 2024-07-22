import AddWishlist from "@/components/AddWishlist";
import { ProductType } from "../../../../types/ProductType";

export default async function DetailProduct({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`, {
    // const res = await fetch(`http://localhost:3000/api/products/${slug}`, {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray rounded-lg overflow-hidden shadow-lg mb-8">
          {/* Image Slider */}
          <div className="flex gap-4 p-4 overflow-x-auto" style={{ justifyContent: "center" }}>
            {data.images.map((el: string, index: number) => (
              <img key={index} src={el} className="w-64 h-auto rounded-lg shadow-md" />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-200 rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
          <p className="text-gray-700 mb-6">{data.description}</p>
          <div className="flex gap-5 mb-5">
            <p>Tags: </p>
            {data.tags.map((el: string, index: number) => (
              <p className="flex" key={index}>
                {el}
              </p>
            ))}
          </div>
          <p className="text-xl font-bold text-gray-900 mb-6">Rp {data.price}</p>
          <AddWishlist productId={data._id} />
        </div>
      </div>
    </>
  );
}
