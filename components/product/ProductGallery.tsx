


"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const safeImages =
    images.length > 0
      ? images
      : ["/images/mock/product-placeholder.svg"];

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [images]);

  const showPrevious = useCallback(() => {
    setSelectedImageIndex((current) =>
      current === 0 ? safeImages.length - 1 : current - 1
    );
  }, [safeImages.length]);

  const showNext = useCallback(() => {
    setSelectedImageIndex((current) =>
      current === safeImages.length - 1 ? 0 : current + 1
    );
  }, [safeImages.length]);

  function handleTouchStart(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchStartX.current = event.targetTouches[0].clientX;
    touchEndX.current = null;
  }

  function handleTouchMove(
    event: React.TouchEvent<HTMLDivElement>
  ) {
    touchEndX.current = event.targetTouches[0].clientX;
  }

  function handleTouchEnd() {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current - touchEndX.current;

    const minimumSwipeDistance = 50;

    if (distance > minimumSwipeDistance) {
      showNext();
    } else if (distance < -minimumSwipeDistance) {
      showPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>
  ) {
    if (safeImages.length <= 1) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  }

  return (
    <div className="product-gallery">
      <div
        className="product-main-image"
        tabIndex={safeImages.length > 1 ? 0 : -1}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label={`${productName} image gallery`}
      >
        <div
          className="product-image-track"
          style={{
            transform: `translateX(-${
              selectedImageIndex * 100
            }%)`,
          }}
        >
          {safeImages.map((image, index) => (
            <div
              className="product-image-slide"
              key={`${image}-${index}`}
            >
              <img
                src={image}
                alt={`${productName}${
                  variantName ? ` - ${variantName}` : ""
                }${
                  safeImages.length > 1
                    ? ` - image ${index + 1}`
                    : ""
                }`}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-arrow gallery-arrow-left"
              onClick={showPrevious}
              aria-label="Previous product image"
            >
              ‹
            </button>

            <button
              type="button"
              className="gallery-arrow gallery-arrow-right"
              onClick={showNext}
              aria-label="Next product image"
            >
              ›
            </button>

            <div
              className="product-image-counter"
              aria-live="polite"
            >
              {selectedImageIndex + 1} / {safeImages.length}
            </div>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div
          className="product-thumbnails"
          aria-label="Product images"
        >
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`product-thumbnail ${
                selectedImageIndex === index
                  ? "is-selected"
                  : ""
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

      {safeImages.length > 1 && (
        <div
          className="product-gallery-dots"
          aria-hidden="true"
        >
          {safeImages.map((_, index) => (
            <span
              key={index}
              className={
                selectedImageIndex === index
                  ? "is-active"
                  : ""
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}