import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getProducts, formatPrice, stripHtml } from "@/lib/woo/client";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) return { title: "Producto no encontrado" };

  const image = product.images[0];

  return {
    title: product.name,
    description: stripHtml(product.short_description || product.description).substring(0, 160),
    openGraph: {
      title: product.name,
      description: stripHtml(product.short_description || product.description).substring(0, 160),
      images: image ? [{ url: image.src, alt: image.alt }] : [],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) notFound();

  // Get related products from same category
  const categoryId = product.categories[0]?.id;
  const relatedProducts = categoryId
    ? await getProducts({ category: String(categoryId), perPage: 5 })
    : { products: [] };

  const related = relatedProducts.products.filter((p) => p.id !== product.id).slice(0, 4);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: stripHtml(product.description),
    image: product.images.map((img) => img.src),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "MXN",
      availability: product.stock_status === "instock"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-void">
        {/* Breadcrumb */}
        <nav className="bg-obsidian border-b border-carbon px-6 py-3">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center gap-2 text-xs text-ash">
              <li><a href="/" className="hover:text-gold transition-colors">Inicio</a></li>
              <li>/</li>
              <li><a href="/collections/all" className="hover:text-gold transition-colors">Colecciones</a></li>
              <li>/</li>
              {product.categories[0] && (
                <>
                  <li>
                    <a href={`/collections/${product.categories[0].slug}`} className="hover:text-gold transition-colors">
                      {product.categories[0].name}
                    </a>
                  </li>
                  <li>/</li>
                </>
              )}
              <li className="text-cream truncate max-w-[200px]">{product.name}</li>
            </ol>
          </div>
        </nav>

        {/* Product */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Gallery */}
              <ProductGallery product={product} />

              {/* Info */}
              <ProductInfo product={product} />
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 px-6 border-t border-carbon">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-syne font-bold uppercase tracking-wider mb-8">También te puede gustar</h2>
              <RelatedProducts products={related} />
            </div>
          </section>
        )}
      </div>
    </>
  );
}
