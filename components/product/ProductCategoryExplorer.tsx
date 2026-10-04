import Link from "next/link";
import type { CatalogCategory } from "@/lib/catalog-types";
import "./ProductCategoryExplorer.css";

type Props = {
  categories: CatalogCategory[];
};

export default function ProductCategoryExplorer({ categories }: Props) {
  if (!categories.length) {
    return null;
  }

  return (
    <section className="product-category-explorer">
      <div className="product-category-explorer-shell">
        <div className="product-category-explorer-heading">
          <span>Discover more</span>
          <h2>Explore Our Categories</h2>
          <p>Find thoughtful corporate gifts for every team, milestone and celebration.</p>
        </div>

        <div className="product-category-explorer-grid">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/category/${category.slug}/`}
              className="product-category-explorer-card"
            >
              <div className="product-category-explorer-image">
                <img
                  src={category.image || "/images/mock/product-placeholder.svg"}
                  alt={category.name}
                />
              </div>

              <div className="product-category-explorer-copy">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span>Explore category <b>→</b></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
