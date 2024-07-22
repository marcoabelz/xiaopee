export type ProductType = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  product: {
    thumbnail: string;
    name: string;
    excerpt: string;
    price: string
  };
};
