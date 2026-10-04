"use client";

import { useState } from "react";
import Link from "next/link";
import { getActiveCategories } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/site-settings";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const categories = getActiveCategories();
  const settings = getSiteSettings();

  const businessName = settings.businessName || "Corporate Gifts";
  const brandSubline = settings.tagline || "Corporate Gifting";

  const close = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" onClick={close}>
          <span className="brand-mark" aria-hidden="true">◆</span>
          <span className="brand-text">
            <strong>{businessName}</strong>
            <small>{brandSubline}</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-dropdown">
            <button className="products-trigger" type="button">
              Products <span className="dropdown-arrow" aria-hidden="true" />
            </button>

            <div className="dropdown-menu">
              <div className="dropdown-header">
                <span>Collections</span>
                <small>Explore our gifting range</small>
              </div>

              <div className="dropdown-links">
                {categories.map((category) => (
                  <Link key={category.slug} href={`/products/category/${category.slug}/`}>
                    <span>{category.name}</span>
                    <span className="dropdown-link-arrow" aria-hidden="true">→</span>
                  </Link>
                ))}
                <Link className="view-all-products" href="/#products">
                  <span>View all products</span><span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <Link href="/about/">About</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>

        <Link className="contact-button desktop-contact" href="/contact/">
          Contact Us <span aria-hidden="true">→</span>
        </Link>

        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <div className="mobile-menu-inner">
          <button
            className="mobile-products-trigger"
            type="button"
            onClick={() => setProductsOpen((value) => !value)}
            aria-expanded={productsOpen}
          >
            <span>Products</span>
            <span className={`mobile-chevron ${productsOpen ? "is-open" : ""}`} aria-hidden="true" />
          </button>

          {productsOpen && (
            <div className="mobile-products">
              {categories.map((category) => (
                <Link key={category.slug} href={`/products/category/${category.slug}/`} onClick={close}>
                  {category.name}<span aria-hidden="true">→</span>
                </Link>
              ))}
              <Link className="mobile-all-products" href="/#products" onClick={close}>
                View all products <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}

          <Link href="/about/" onClick={close}>About <span aria-hidden="true">→</span></Link>
          <Link href="/#faq" onClick={close}>FAQ <span aria-hidden="true">→</span></Link>
          <Link className="mobile-contact-button" href="/contact/" onClick={close}>
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
