"use client";

import { useEffect, useState } from "react";
import "./ProductGallery.css";

type Props = {
  productName: string;
  variantName?: string;
  images: string[];
};

export default function ProductGallery({
  productName,
  variantName,
  images,
}: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [images]);

  const safeImages =
    images.length > 0 ? images : ["/images/mock/product-placeholder.svg"];

  const selectedImage =
    safeImages[selectedImageIndex] ?? safeImages[0];

  return (
    <div className="product-gallery">
      <div className="product-main-image">
        <img
          src={selectedImage}
          alt={`${productName}${variantName ? ` - ${variantName}` : ""}`}
        />
      </div>

      {safeImages.length > 1 && (
        <div className="product-thumbnails" aria-label="Product images">
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`product-thumbnail ${
                selectedImageIndex === index ? "is-selected" : ""
              }`}
              aria-label={`View image ${index + 1}`}
              aria-pressed={selectedImageIndex === index}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
