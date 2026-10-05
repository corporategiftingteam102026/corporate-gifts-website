

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import VariantSelector from "./VariantSelector";
import ProductInformation from "./ProductInformation";
import type {
  CatalogCategory,
  CatalogProduct,
  CatalogVariant,
} from "@/lib/catalog-types";
import "./ProductDetails.css";

type Props = {
  product: CatalogProduct;
  category?: CatalogCategory;
};

export default function ProductDetails({ product, category }: Props) {
  const defaultVariant = useMemo<CatalogVariant | undefined>(
    () =>
      product.variants.find(
        (variant) => variant.active && variant.isDefault
      ) ??
      product.variants.find((variant) => variant.active),
    [product.variants]
  );

  const [selectedVariantSlug, setSelectedVariantSlug] = useState(
    defaultVariant?.slug ?? ""
  );

  const selectedVariant =
    product.variants.find(
      (variant) =>
        variant.active && variant.slug === selectedVariantSlug
    ) ?? defaultVariant;

  const galleryImages =
    selectedVariant?.images?.length
      ? selectedVariant.images
      : product.image
        ? [product.image]
        : ["/images/mock/product-placeholder.svg"];

  const price =
    selectedVariant?.priceOverride ?? product.startingPrice;

  const quoteHref =
    `/contact/?product=${encodeURIComponent(product.name)}` +
    `&variant=${encodeURIComponent(
      selectedVariant?.colorName ?? ""
    )}`;

  return (
    <section className="product-detail-section">
      <div className="product-detail-shell">
        <nav
          className="product-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link href="/">Home</Link>

          <span>/</span>

          <Link href="/#products">Products</Link>

          {category && (
            <>
              <span>/</span>

              <Link
                href={`/products/category/${category.slug}/`}
              >
                {category.name}
              </Link>
            </>
          )}

          <span>/</span>

          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          <div className="product-gallery-column">
            <ProductGallery
              productName={product.name}
              variantName={selectedVariant?.colorName}
              images={galleryImages}
            />
          </div>

          <div className="product-summary">
            {category && (
              <Link
                className="product-category-label"
                href={`/products/category/${category.slug}/`}
              >
                {category.name}
              </Link>
            )}

            <h1>{product.name}</h1>

            <p className="product-short-description">
              {product.shortDescription}
            </p>

            <div className="product-price-block">
              <span>Starting from</span>

              <div className="product-price">
                <strong>
                  {price !== undefined
                    ? `₹${price.toLocaleString("en-IN")}`
                    : "Price on request"}
                </strong>

                {price !== undefined && (
                  <small>per unit*</small>
                )}
              </div>

              <p>
                *Final pricing may vary by quantity,
                customization and selected variant.
              </p>
            </div>

            {product.variants.some(
              (variant) => variant.active
            ) && (
              <VariantSelector
                variants={product.variants}
                selectedVariantSlug={
                  selectedVariant?.slug ?? ""
                }
                onSelect={setSelectedVariantSlug}
              />
            )}

            <div className="product-order-meta">
              {product.moq > 0 && (
                <div>
                  <span>Minimum order</span>
                  <strong>{product.moq} units</strong>
                </div>
              )}

              <div>
                <span>Branding</span>
                <strong>Available</strong>
              </div>

              <div>
                <span>Bulk orders</span>
                <strong>Supported</strong>
              </div>
            </div>

            <Link
              className="product-quote-button"
              href={quoteHref}
            >
              <span>Contact us</span>
              <span aria-hidden="true">→</span>
            </Link>

            <p className="quote-helper">
              Tell us your quantity, branding requirements
              and delivery timeline.
            </p>
          </div>
        </div>

        <ProductInformation product={product} />
      </div>
    </section>
  );
}
