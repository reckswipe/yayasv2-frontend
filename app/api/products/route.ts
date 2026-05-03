import { NextResponse } from "next/server";
import { getProducts } from "@/lib/woo/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = {
    page: parseInt(searchParams.get("page") || "1"),
    perPage: parseInt(searchParams.get("perPage") || "12"),
    category: searchParams.get("category") || undefined,
    search: searchParams.get("search") || undefined,
    orderby: (searchParams.get("orderby") as any) || "date",
    order: (searchParams.get("order") as any) || "desc",
  };

  try {
    const result = await getProducts(params);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}