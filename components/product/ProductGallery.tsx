"use client";
import { useState } from "react";
import Image from "next/image";
import type { WooProduct } from "@/lib/woo/client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
  product: WooProduct;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const images = product.images;
  const mainImage = images[selectedIndex];

  const goNext = () => setSelectedIndex((i) => (i + 1) % images.length);
  const goPrev = () => setSelectedIndex((i) => (i - 1 + images.length) % images.length);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-obsidian flex items-center justify-center">
        <span className="text-ash">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className="relative aspect-square bg-obsidian overflow-hidden cursor-zoom-in group"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <Image
          src={mainImage.src}
          alt={mainImage.alt || product.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-void/30">
          <ZoomIn size={32} className="text-white" />
        </div>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-void/80 flex items-center justify-center hover:bg-gold hover:text-void transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-void/80 flex items-center justify-center hover:bg-gold hover:text-void transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 bg-obsidian overflow-hidden transition-all",
                i === selectedIndex ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img.src} alt={img.alt || ""} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}