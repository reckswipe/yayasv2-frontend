/**
 * WooCommerce REST API Client — Headless para YAYAS v2
 * Docs: https://woocommerce.github.io/woocommerce-rest-api-docs/
 */

import { WooProduct, WooCategory } from "./types";
import { DEMO_PRODUCTS, DEMO_CATEGORIES } from "./demo-data";

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

async function wooFetch<T>(endpoint: string, params: Record<string, string | number | boolean> = {}): Promise<T> {
  // If WooCommerce not configured, return empty array
  if (!WOO_CONFIG.consumerKey) {
    if (endpoint === "products") return [] as unknown as T;
    if (endpoint === "products/categories") return [] as unknown as T;
    throw new Error(`WooCommerce not configured and endpoint ${endpoint} not supported in demo mode`);
  }

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

  // If WooCommerce not configured, return demo data
  if (!WOO_CONFIG.consumerKey) {
    let filtered = [...DEMO_PRODUCTS];
    if (category) {
      filtered = filtered.filter(p => p.categories.some(c => c.slug === category));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return { products: filtered, total: filtered.length };
  }

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
  if (!WOO_CONFIG.consumerKey) {
    return DEMO_PRODUCTS.find(p => p.slug === slug) || null;
  }
  const products = await wooFetch<WooProduct[]>("products", { slug });
  return products[0] || null;
}

export async function getFeaturedProducts(limit = 8): Promise<WooProduct[]> {
  if (!WOO_CONFIG.consumerKey) {
    return DEMO_PRODUCTS.filter(p => p.featured).slice(0, limit);
  }
  return wooFetch<WooProduct[]>("products", { featured: true, per_page: limit });
}

export async function getBestSellers(limit = 8): Promise<WooProduct[]> {
  if (!WOO_CONFIG.consumerKey) {
    return DEMO_PRODUCTS.slice(0, limit);
  }
  return wooFetch<WooProduct[]>("products", { orderby: "popularity", order: "desc", per_page: limit });
}

// ===== CATEGORIES =====

export async function getCategories(): Promise<WooCategory[]> {
  if (!WOO_CONFIG.consumerKey) {
    return DEMO_CATEGORIES as unknown as WooCategory[];
  }
  return wooFetch<WooCategory[]>("products/categories", { per_page: 100, hide_empty: true });
}

export async function getCategoryBySlug(slug: string): Promise<WooCategory | null> {
  if (!WOO_CONFIG.consumerKey) {
    return (DEMO_CATEGORIES.find(c => c.slug === slug) as unknown as WooCategory) || null;
  }
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

export type { WooProduct, WooProductImage, WooCategory } from "./types";