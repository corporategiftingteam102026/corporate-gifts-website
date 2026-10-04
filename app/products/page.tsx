import "./category/[slug]/category-page.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryProductGrid from "@/components/category/CategoryProductGrid";
import {getActiveProducts} from "@/lib/catalog";

export default function ProductsPage(){
    const products=getActiveProducts();
    return <>
    <Navbar/>
    <main>
        <section className="category-hero">
            <div className="category-hero-shell">
                <div className="category-hero-content">
                    <span className="category-eyebrow">Corporate gifting catalogue
                        </span>
                        <h1>All Products</h1>
                        <p>Explore our curated selection of professional gifts for teams, clients and occasions.</p>
                </div>
            </div>
        </section>
        <section className="category-products-section">
            <div className="category-products-shell"><CategoryProductGrid products={products}/></div>
        </section>
    </main>
    <Footer/></>}
