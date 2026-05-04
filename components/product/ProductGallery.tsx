"use client";
import { useState } from "react";
import Image from "next/image";
import type { WooProduct } from "@/lib/woo/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  product: WooProduct;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = product.images;
  const mainImage = images[selectedIndex];

  const goTo = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  const goNext = () => goTo((selectedIndex + 1) % images.length);
  const goPrev = () => goTo((selectedIndex - 1 + images.length) % images.length);

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
      <div className="relative aspect-[3/4] bg-obsidian overflow-hidden group">
        {mainImage && (
          <Image
            src={mainImage.src}
            alt={mainImage.alt || product.name}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isTransitioning ? "opacity-0 scale-[1.02]" : "opacity-100 scale-100"
            )}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-void/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-void"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-void/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-void"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-void/80 backdrop-blur-sm">
          <span className="text-xs font-mono text-ash">{selectedIndex + 1} / {images.length}</span>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => goTo(i)}
              className={cn(
                "relative w-20 h-20 flex-shrink-0 bg-carbon overflow-hidden transition-all duration-300",
                i === selectedIndex
                  ? "ring-2 ring-gold opacity-100"
                  : "opacity-60 hover:opacity-90 ring-1 ring-transparent"
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
