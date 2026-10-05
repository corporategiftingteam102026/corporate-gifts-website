

import { notFound } from "next/navigation";
import CategoryHeader from "@/components/category/CategoryHeader";
import CategoryProductGrid from "@/components/category/CategoryProductGrid";
import Categories from "@/components/home/Categories";
import {
  getActiveCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/catalog";
import "./category-page.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/*
  Required for Next.js static export / GitHub Pages.
  Every active category becomes a static page at build time.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveCategories().map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <main className="category-page">
      <Navbar />
      <CategoryHeader category={category} />

      <section className="category-products-section">
        <div className="category-products-shell">
          <div className="category-products-toolbar">
            <div>
              <span className="category-products-kicker">
                Our collection
              </span>

              <h2>Explore {category.name}</h2>
            </div>

            <p>
              {products.length}{" "}
              {products.length === 1
                ? "product"
                : "products"}
            </p>
          </div>

          <CategoryProductGrid products={products} />
        </div>
      </section>

      <section className="category-discover-section">
        <Categories />
      </section>
      <Footer />
    </main>
  );
}