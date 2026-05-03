/**
 * WooCommerce REST API Client — Headless para YAYAS v2
 * Docs: https://woocommerce.github.io/woocommerce-rest-api-docs/
 */

import { WooProduct, WooCategory } from "./types";

const WOO_CONFIG = {
  url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://yayas.mx/wp-json/wc/v3",
  consumerKey: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || "",
  consumerSecret: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET || "",
  perPage: 100,
} as const;

function getAuthHeader(): string {
  const auth = Buffer.from(`${WOO_CONFIG.consumerKey}:${WOO_CONFIG.consumerSecret}`).toString("base64");
  return `Basic ${auth}`;
}

async function wooFetch<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${WOO_CONFIG.url}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // 1 hour cache
  });

  if (!response.ok) {
    throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ===== PRODUCTS =====

export async function getProducts(params: {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
  orderby?: "date" | "price" | "popularity" | "rating";
  order?: "asc" | "desc";
  stockStatus?: "instock" | "outofstock" | "onbackorder";
} = {}): Promise<{ products: WooProduct[]; total: number }> {
  const { page = 1, perPage = 12, category, search, orderby = "date", order = "desc", stockStatus } = params;

  const apiParams: Record<string, string | number> = {
    page,
    per_page: Math.min(perPage, 100),
    orderby,
    order,
    status: "publish",
  };

  if (category) apiParams.category = category;
  if (search) apiParams.search = search;
  if (stockStatus) apiParams.stock_status = stockStatus;

  const products = await wooFetch<WooProduct[]>("products", apiParams);
  return { products, total: products.length };
}

export async function getProductBySlug(slug: string): Promise<WooProduct | null> {
  const products = await wooFetch<WooProduct[]>("products", { slug });
  return products[0] || null;
}

export async function getFeaturedProducts(limit = 8): Promise<WooProduct[]> {
  return wooFetch<WooProduct[]>("products", { featured: true, per_page: limit });
}

export async function getBestSellers(limit = 8): Promise<WooProduct[]> {
  return wooFetch<WooProduct[]>("products", { orderby: "popularity", order: "desc", per_page: limit });
}

// ===== CATEGORIES =====

export async function getCategories(): Promise<WooCategory[]> {
  return wooFetch<WooCategory[]>("products/categories", { per_page: 100, hide_empty: true });
}

export async function getCategoryBySlug(slug: string): Promise<WooCategory | null> {
  const cats = await wooFetch<WooCategory[]>("products/categories", { slug, hide_empty: true });
  return cats[0] || null;
}

// ===== HELPERS =====

export function formatPrice(price: number | string): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}