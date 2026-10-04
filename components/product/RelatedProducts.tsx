import Link from "next/link";
import CategoryProductCard from "@/components/category/CategoryProductCard";
import type {
  CatalogCategory,
  CatalogProduct,
} from "@/lib/catalog-types";
import "./RelatedProducts.css";

type Props = {
  category?: CatalogCategory;
  products: CatalogProduct[];
};

export default function RelatedProducts({ category, products }: Props) {
  if (!category || products.length === 0) {
    return null;
  }

  return (
    <section className="related-products-section">
      <div className="related-products-shell">
        <div className="related-products-heading">
          <div>
            <span>Continue exploring</span>
            <h2>More from {category.name}</h2>
          </div>

          <Link href={`/products/category/${category.slug}/`}>
            View all {category.name} <span>→</span>
          </Link>
        </div>

        <div className="related-products-grid">
          {products.map((product) => (
            <CategoryProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
