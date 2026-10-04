/*
  UI DATA BOUNDARY

  React components never call Google Sheets or Drive directly.

  Build pipeline:
    Google Sheets + Google Drive
      -> scripts/sync-google-data.ts
      -> validation
      -> data/generated/catalog.json + public/generated/*
      -> Next.js static build
      -> GitHub Pages
*/

import catalogData from "@/data/generated/catalog.json";
import type {
  CatalogCategory,
  CatalogData,
  CatalogProduct,
} from "./catalog-types";

const catalog = catalogData as CatalogData;

export function getActiveCategories(): CatalogCategory[] {
  return catalog.categories
    .filter((category) => category.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getCategoryBySlug(slug: string): CatalogCategory | undefined {
  return getActiveCategories().find((category) => category.slug === slug);
}

export function getActiveProducts(): CatalogProduct[] {
  return catalog.products
    .filter((product) => product.active)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return getActiveProducts().filter(
    (product) => product.categorySlug === categorySlug
  );
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return getActiveProducts().find((product) => product.slug === slug);
}
