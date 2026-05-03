export interface WooProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  on_sale: boolean;
  stock_quantity: number | null;
  stock_status: string;
  featured: boolean;
  description: string;
  short_description: string;
  categories: { id: number; name: string; slug: string }[];
  images: WooProductImage[];
  sku: string;
  tags: { id: number; name: string; slug: string }[];
  attributes: { id: number; name: string; options: string[] }[];
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  image: string | null;
}