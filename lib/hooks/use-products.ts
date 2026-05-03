"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductBySlug, getFeaturedProducts, getBestSellers } from "@/lib/woo/client";

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params as Parameters<typeof getProducts>[0]),
    staleTime: 3600000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
    staleTime: 3600000,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getFeaturedProducts(8),
    staleTime: 3600000,
  });
}

export function useBestSellers() {
  return useQuery({
    queryKey: ["best-sellers"],
    queryFn: () => getBestSellers(8),
    staleTime: 3600000,
  });
}