import Link from "next/link";
import { getSiteSettings } from "@/lib/site-settings";
import "./Hero.css";

export default function Hero() {
  const settings = getSiteSettings();
  const businessName = settings.businessName || "Corporate Gifts";
  const tagline = settings.tagline || "Thoughtful gifting for meaningful business relationships.";
  const description = settings.aboutShort || "Premium corporate gifting for employees, clients and every milestone worth celebrating. Curated with care and made memorable for your brand.";

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <span className="eyebrow">{businessName}</span>
        <h1 id="hero-title">{tagline}</h1>
        <p>{description}</p>

        <div className="hero-benefits" aria-label="Gifting benefits">
          <span>✦ Thoughtfully curated</span>
          <span>✦ Customisable for your brand</span>
          <span>✦ Made for teams & clients</span>
        </div>

        <div className="hero-actions">
          <Link className="primary-button" href="/#products">Explore Gifts <span aria-hidden="true">→</span></Link>
          <Link className="hero-secondary-link" href="/contact/">Plan your gifting</Link>
        </div>
      </div>

      <div className="hero-visual" aria-label="Corporate gifting collection">
        <img src="./images/Warm Corporate Gift Exchange.png" alt="A curated corporate gifting collection with a premium gift box, notebook, bottle, mug and desk clock" />
        {/* <div className="hero-visual-caption">
          <span>Curated for every occasion</span>
          <strong>Welcome kits · Milestones · Client gifts</strong>
        </div> */}
      </div>
    </section>
  );
}
