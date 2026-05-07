import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug, getProducts, formatPrice, stripHtml } from "@/lib/woo/client";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Truck, RotateCcw, Shield, Award, Leaf, Star } from "lucide-react";

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductBySlug(handle);
  if (!product) return { title: "Producto no encontrado" };

  const image = product.images[0];
  return {
    title: `${product.name} — YAYAS`,
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

  const categoryId = product.categories[0]?.id;
  const relatedProducts = categoryId
    ? await getProducts({ category: String(categoryId), perPage: 5 })
    : { products: [] };

  const related = relatedProducts.products.filter((p) => p.id !== product.id).slice(0, 4);
  const description = stripHtml(product.description || product.short_description);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description,
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
              <li><Link href="/" className="hover:text-gold transition-colors">Inicio</Link></li>
              <li className="text-carbon">/</li>
              <li><Link href="/collections/all" className="hover:text-gold transition-colors">Colecciones</Link></li>
              <li className="text-carbon">/</li>
              {product.categories[0] && (
                <>
                  <li>
                    <Link href={`/collections/${product.categories[0].slug}`} className="hover:text-gold transition-colors">
                      {product.categories[0].name}
                    </Link>
                  </li>
                  <li className="text-carbon">/</li>
                </>
              )}
              <li className="text-cream truncate max-w-[200px]">{product.name}</li>
            </ol>
          </div>
        </nav>

        {/* Product — Gallery + Info side by side */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Gallery */}
              <ProductGallery product={product} />

              {/* Info — sticky */}
              <ProductInfo product={product} />
            </div>
          </div>
        </section>

        {/* === LONG-FORM CONTENT === */}

        {/* Editorial: Product Story */}
        <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-px bg-gold" />
                  <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">La Historia</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-syne font-black uppercase tracking-[0.03em] leading-[0.95] mb-6">
                  Diseñado para<br />
                  <span className="text-gradient-gold-subtle">quien se atreve</span>
                </h2>
                <div className="space-y-4 text-ash leading-relaxed">
                  <p>{description.length > 100 ? description : `${description} Cada pieza YAYAS está diseñada para quienes caminan entre dos mundos: la oscuridad y la luz, lo artesanal y lo contemporáneo, el ritual y la calle.`}</p>
                  <p>Crafted con atención obsesiva al detalle en talleres locales de Ciudad de México. No seguimos tendencias — las creamos desde la raíz.</p>
                </div>
              </div>
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
                {product.images[0] && (
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover brightness-80"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent" />
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-gold/40" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-gold/40" />
              </div>
            </div>
          </div>
        </section>

        {/* Materials & Care */}
        <section className="py-20 px-6 bg-void">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Construcción</span>
                <span className="w-8 h-px bg-gold" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em]">
                Materiales y Cuidado
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Material */}
              <div className="p-8 border border-carbon bg-obsidian">
                <div className="flex items-center gap-3 mb-6">
                  <Leaf size={20} className="text-gold" />
                  <h3 className="font-syne text-sm font-bold uppercase tracking-wider text-cream">Materiales</h3>
                </div>
                <ul className="space-y-3 text-sm text-ash">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    100% algodón orgánico certificado (donde aplica)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    Tela pre-lavada para stabilize shrinkage
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    Costuras reforzadas en áreas de alto estrés
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    Estampados y bordados de larga duración
                  </li>
                </ul>
              </div>

              {/* Care */}
              <div className="p-8 border border-carbon bg-obsidian">
                <div className="flex items-center gap-3 mb-6">
                  <Award size={20} className="text-gold" />
                  <h3 className="font-syne text-sm font-bold uppercase tracking-wider text-cream">Instrucciones de Cuidado</h3>
                </div>
                <ul className="space-y-3 text-sm text-ash">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    Lavar en agua fría (máx. 30°C)
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    Secar colgado o en tendedero
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    Planchar en reverso a temperatura baja
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                    No blanquear ni usar secadora
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why YAYAS */}
        <section className="py-20 px-6 bg-obsidian border-y border-carbon/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Por Qué YAYAS</span>
                <span className="w-8 h-px bg-gold" />
              </div>
              <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em]">
                Más que una prenda
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: Star,
                  title: "Calidad Artesanal",
                  desc: "Cada pieza es inspectada antes de salir. No hacemos masa — hacemos arte wearable.",
                },
                {
                  icon: Truck,
                  title: "Envío Gratuito",
                  desc: "En pedidos mayores a $499 MXN. Tu orden llega en 2-5 días hábiles.",
                },
                {
                  icon: RotateCcw,
                  title: "30 Días de Devolución",
                  desc: "Si no te encanta, te devolvemos tu dinero. Sin preguntas, sin costo.",
                },
                {
                  icon: Shield,
                  title: "Pago Seguro",
                  desc: "Tarjeta, OXXO, SPEI. Tus datos están protegidos con cifrado de 256 bits.",
                },
                {
                  icon: Award,
                  title: "Ediciones Limitadas",
                  desc: "Drops exclusivos. Piezas numeradas. No encontrarás estas piezas en ningún otro lugar.",
                },
                {
                  icon: Leaf,
                  title: "Producción Responsable",
                  desc: "Talleres locales en CDMX. Tela con certificación orgánica. Cero fast fashion.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 border border-carbon bg-void group hover:border-gold/30 transition-colors duration-300">
                  <div className="w-12 h-12 bg-carbon flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-syne text-sm font-bold uppercase tracking-wider text-cream mb-3">
                    {title}
                  </h3>
                  <p className="text-ash text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping & Returns quick info */}
        <section className="py-16 px-6 bg-void">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <a href="/shipping" className="group flex items-center gap-5 p-7 border border-carbon bg-obsidian hover:border-gold/40 transition-colors">
                <Truck size={28} className="text-gold flex-shrink-0" />
                <div>
                  <h3 className="font-syne text-sm font-bold uppercase tracking-wider text-cream mb-1 group-hover:text-gold transition-colors">Envíos</h3>
                  <p className="text-ash text-xs">Gratis en pedidos +$499 MXN. 2-5 días hábiles en toda México.</p>
                </div>
                <svg className="w-4 h-4 text-gold ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="/returns" className="group flex items-center gap-5 p-7 border border-carbon bg-obsidian hover:border-gold/40 transition-colors">
                <RotateCcw size={28} className="text-gold flex-shrink-0" />
                <div>
                  <h3 className="font-syne text-sm font-bold uppercase tracking-wider text-cream mb-1 group-hover:text-gold transition-colors">Devoluciones</h3>
                  <p className="text-ash text-xs">30 días para devolver. Envío de devolución gratis.</p>
                </div>
                <svg className="w-4 h-4 text-gold ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-20 px-6 border-t border-carbon bg-obsidian">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <span className="w-8 h-px bg-gold" />
                <span className="text-gold uppercase tracking-[0.3em] text-[10px] font-mono">Colecciones</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-syne font-black uppercase tracking-[0.03em] mb-12">
                También te puede <span className="text-gradient-gold-subtle">gustar</span>
              </h2>
              <RelatedProducts products={related} />
            </div>
          </section>
        )}
      </div>
    </>
  );
}