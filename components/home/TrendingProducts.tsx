// "use client";
// import {useEffect,useRef,useState} from "react"; import Link from "next/link"; import {getActiveProducts} 
// from "@/lib/catalog"; 

// import "@/components/home/TrendingProducts.css"
// export default function TrendingProducts(){
//     const ref=useRef<HTMLDivElement>(null),anim=useRef<number|null>(null),paused=useRef(false);const [pause,setPause]=useState(false);const items=getActiveProducts().filter(p=>p.trending);const loop=items.length>1?[...items,...items]:items;useEffect(()=>{paused.current=pause},[pause]);useEffect(()=>{const el=ref.current;if(!el||items.length<2)return;let prev:number|null=null;const tick=(t:number)=>{if(prev===null)prev=t;const d=t-prev;prev=t;if(!paused.current){el.scrollLeft+=16*d/1000;const h=el.scrollWidth/2;if(el.scrollLeft>=h)el.scrollLeft-=h}anim.current=requestAnimationFrame(tick)};anim.current=requestAnimationFrame(tick);return()=>{if(anim.current!==null)cancelAnimationFrame(anim.current)}},[items.length]);if(!items.length)return null;const move=(n:number)=>ref.current?.scrollBy({left:n,behavior:"smooth"});return <section className="trending-section"><div className="trending-heading"><span className="trending-eyebrow">Selected favourites</span><h2>Trending Gifts</h2><p>Popular choices for welcoming, recognising and celebrating the people who matter to your business.</p></div><div className="trending-carousel" onMouseEnter={()=>setPause(true)} onMouseLeave={()=>setPause(false)} onFocus={()=>setPause(true)} onBlur={()=>setPause(false)}><button className="carousel-arrow carousel-arrow-left" onClick={()=>move(-300)} aria-label="Previous">‹</button><div ref={ref} className="trending-track">{loop.map((p,i)=><Link key={`${p.slug}-${i}`} href={`/products/${p.slug}/`} className="trending-card"><div className="trending-image"><img src={p.image||"/images/mock/product-placeholder.svg"} alt={p.name}/><span className="trending-pill">Curated Pick</span></div><div className="trending-card-content"><h3>{p.name}</h3><p>{p.shortDescription}</p><div className="trending-card-footer"><div><small>{p.startingPrice!==undefined?"Starting from":"Pricing"}</small><strong>{p.startingPrice!==undefined?`₹${p.startingPrice.toLocaleString("en-IN")}`:"On request"}</strong></div><span className="product-view-arrow">→</span></div></div></Link>)}</div><button className="carousel-arrow carousel-arrow-right" onClick={()=>move(300)} aria-label="Next">›</button></div></section>}




"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getActiveProducts } from "@/lib/catalog";

import "@/components/home/TrendingProducts.css";

export default function TrendingProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const anim = useRef<number | null>(null);
  const paused = useRef(false);

  const [pause, setPause] = useState(false);

  const items = getActiveProducts().filter((p) => p.trending);
  const loop = items.length > 1 ? [...items, ...items] : items;

  useEffect(() => {
    paused.current = pause;
  }, [pause]);

  useEffect(() => {
    const el = ref.current;

    if (!el || items.length < 2) return;

    let prev: number | null = null;

    const tick = (t: number) => {
      if (prev === null) prev = t;

      const d = t - prev;
      prev = t;

      if (!paused.current) {
        el.scrollLeft += (16 * d) / 1000;

        const h = el.scrollWidth / 2;

        if (el.scrollLeft >= h) {
          el.scrollLeft -= h;
        }
      }

      anim.current = requestAnimationFrame(tick);
    };

    anim.current = requestAnimationFrame(tick);

    return () => {
      if (anim.current !== null) {
        cancelAnimationFrame(anim.current);
      }
    };
  }, [items.length]);

  if (!items.length) return null;

  const move = (n: number) =>
    ref.current?.scrollBy({
      left: n,
      behavior: "smooth",
    });

  return (
    <section className="trending-section">
      <div className="trending-heading">
        <span className="trending-eyebrow">Selected favourites</span>

        <h2>Trending Gifts</h2>

        <p>
          Popular choices for welcoming, recognising and celebrating the people
          who matter to your business.
        </p>
      </div>

      <div
        className="trending-carousel"
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        onFocus={() => setPause(true)}
        onBlur={() => setPause(false)}
      >
        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={() => move(-300)}
          aria-label="Previous"
        >
          ‹
        </button>

        <div ref={ref} className="trending-track">
          {loop.map((p, i) => (
            <Link
              key={`${p.slug}-${i}`}
              href={`/products/${p.slug}/`}
              className="trending-card"
            >
              <div className="trending-image">
                <img
                  src={p.image || "/images/mock/product-placeholder.svg"}
                  alt={p.name}
                />

                <span className="trending-pill">Curated Pick</span>
              </div>

              <div className="trending-card-content">
                <h3>{p.name}</h3>

                <p>{p.shortDescription}</p>

                <div className="trending-card-footer">
                  <div>
                    <small>
                      {p.startingPrice !== undefined
                        ? "Starting from"
                        : "Pricing"}
                    </small>

                    <strong>
                      {p.startingPrice !== undefined
                        ? `₹${p.startingPrice.toLocaleString("en-IN")}`
                        : "On request"}
                    </strong>
                  </div>

                  <span className="product-view-arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={() => move(300)}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </section>
  );
}