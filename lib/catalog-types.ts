export type CatalogVariant = {
  slug: string;
  colorName: string;
  colorHex?: string;
  priceOverride?: number;
  isDefault: boolean;
  active: boolean;
  images: string[];
};

export type CatalogProduct = {
  slug: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  startingPrice?: number;
  moq: number;
  featured: boolean;
  trending: boolean;
  displayOrder: number;
  active: boolean;
  image?: string;
  variants: CatalogVariant[];
};

export type CatalogCategory = {
  slug: string;
  name: string;
  description: string;
  displayOrder: number;
  active: boolean;
  image?: string;
};

export type CatalogData = {
  categories: CatalogCategory[];
  products: CatalogProduct[];
};
