import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductCategoryExplorer from "@/components/product/ProductCategoryExplorer";
import {
  getActiveProducts,
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
  getActiveCategories,
} from "@/lib/catalog";
import "./product-page.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/*
  Required for `output: "export"` / GitHub Pages.
  Product pages are generated at build time from normalized catalog data.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return getActiveProducts().map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 8);

  const categories = getActiveCategories();

  return (
    <>
      <Navbar />

      <main className="product-page">
        <ProductDetails product={product} category={category} />

        <RelatedProducts
          category={category}
          products={relatedProducts}
        />

        <ProductCategoryExplorer categories={categories} />
      </main>

      <Footer />
    </>
  );
}
