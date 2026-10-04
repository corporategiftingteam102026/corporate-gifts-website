"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog-types";
import "./CategoryProductCard.css";

type Props = {
  product: CatalogProduct;
};

export default function CategoryProductCard({ product }: Props) {
  const defaultVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.active && variant.isDefault) ??
      product.variants.find((variant) => variant.active),
    [product.variants]
  );

  const [selectedVariantSlug, setSelectedVariantSlug] = useState(
    defaultVariant?.slug ?? ""
  );

  const selectedVariant =
    product.variants.find(
      (variant) => variant.active && variant.slug === selectedVariantSlug
    ) ?? defaultVariant;

  const image =
    selectedVariant?.images[0] ??
    product.image ??
    "/images/mock/product-placeholder.svg";

  const price =
    selectedVariant?.priceOverride ?? product.startingPrice;

  const activeVariants = product.variants.filter((variant) => variant.active);

  return (
    <article className="catalog-product-card">
      <Link
        href={`/products/${product.slug}/`}
        className="catalog-product-image-link"
      >
        <div className="catalog-product-image">
          <img src={image} alt={product.name} />
          {product.featured && (
            <span className="catalog-featured-badge">Featured</span>
          )}
        </div>
      </Link>

      <div className="catalog-product-content">
        <Link href={`/products/${product.slug}/`} className="catalog-product-title">
          <h3>{product.name}</h3>
        </Link>

        <p className="catalog-product-description">
          {product.shortDescription}
        </p>

        {activeVariants.length > 0 && (
          <div className="catalog-variants">
            <span className="catalog-variants-label">
              {selectedVariant?.colorName ?? "Colours"}
            </span>

            <div className="catalog-variant-list">
              {activeVariants.slice(0, 5).map((variant) => {
                const selected = variant.slug === selectedVariant?.slug;
                const thumbnail = variant.images[0];

                return (
                  <button
                    key={variant.slug}
                    type="button"
                    className={`catalog-variant-button ${
                      selected ? "is-selected" : ""
                    }`}
                    title={variant.colorName}
                    aria-label={`Show ${variant.colorName}`}
                    aria-pressed={selected}
                    onClick={() => setSelectedVariantSlug(variant.slug)}
                  >
                    {thumbnail ? (
                      <img src={thumbnail} alt="" />
                    ) : (
                      <span
                        style={{
                          backgroundColor: variant.colorHex || "#e9ded4",
                        }}
                      />
                    )}
                  </button>
                );
              })}

              {activeVariants.length > 5 && (
                <span className="catalog-more-variants">
                  +{activeVariants.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="catalog-product-meta">
          <div>
            <small>{price !== undefined ? "Starting from" : "Pricing"}</small>
            <strong>{price !== undefined ? `₹${price.toLocaleString("en-IN")}` : "On request"}</strong>
          </div>

          {product.moq > 0 && (
            <div className="catalog-moq">
              <small>MOQ</small>
              <strong>{product.moq}</strong>
            </div>
          )}
        </div>

        <Link className="catalog-view-product" href={`/products/${product.slug}/`}>
          <span>View Product</span>
          <span>→</span>
        </Link>
      </div>
    </article>
  );
}
