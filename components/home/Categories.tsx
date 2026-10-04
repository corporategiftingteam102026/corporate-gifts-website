import Link from "next/link";
import { getActiveCategories } from "@/lib/catalog";
import "./Categories.css";

export default function Categories(){
    const categories=getActiveCategories();
    if(!categories.length)return null;
    return <section className="categories-section" id="products">
        <div className="section-heading">
            <span className="eyebrow">Curated for every occasion</span><h2>Our Collections</h2>
            <p>Purposeful corporate gifts, presented with polish for teams, clients and meaningful milestones.</p>
        </div>
        <div className="category-grid">{categories.map(c=><Link className="category-card" href={`/products/category/${c.slug}/`} key={c.slug}><div className="category-image"><img src={c.image||"/images/mock/product-placeholder.svg"} alt={c.name}/>
        </div><div className="category-copy"><h3>{c.name}</h3><p>{c.description}</p><span>Explore Collection <b>→</b></span></div></Link>)}</div></section>}
