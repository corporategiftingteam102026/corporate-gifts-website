import CategoryProductCard from "./CategoryProductCard";
import type { CatalogProduct } from "@/lib/catalog-types";
import "./CategoryProductGrid.css";

type Props = {
  products: CatalogProduct[];
};

export default function CategoryProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="category-empty-state">
        <span aria-hidden="true">◇</span>
        <h3>Products are being curated</h3>
        <p>There are no active products in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="category-product-grid">
      {products.map((product) => (
        <CategoryProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
