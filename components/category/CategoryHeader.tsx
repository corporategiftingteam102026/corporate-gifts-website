import Link from "next/link";
import type { CatalogCategory } from "@/lib/catalog-types";
import "./CategoryHeader.css";

type Props = {
  category: CatalogCategory;
};

export default function CategoryHeader({ category }: Props) {
  return (
    <section className="category-hero">
      <span className="category-hero-decoration decoration-one" aria-hidden="true">✦</span>
      <span className="category-hero-decoration decoration-two" aria-hidden="true">◇</span>

      <div className="category-hero-shell">
        <nav className="category-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#products">Products</Link>
          <span aria-hidden="true">/</span>
          <span>{category.name}</span>
        </nav>

        <div className="category-hero-content">
          <span className="category-eyebrow">Corporate gifting collection</span>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </div>
    </section>
  );
}
