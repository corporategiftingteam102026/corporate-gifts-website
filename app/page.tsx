import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import ProductCategories from "@/components/home/Categories";
import TrendingProducts from "@/components/home/TrendingProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";
import OccasionGifting from "@/components/home/OccasionGifting";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductCategories />
        <OccasionGifting />
        <TrendingProducts />
        <WhyChooseUs />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
