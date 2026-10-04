import Link from "next/link";
import { getActiveCategories } from "@/lib/catalog";
import { getSiteSettings } from "@/lib/site-settings";
import "./Footer.css";

function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, "");
}

export default function Footer() {
  const categories = getActiveCategories();
  const settings = getSiteSettings();
  const businessName = settings.businessName || "Corporate Gifts";
  const whatsappNumber = digitsOnly(settings.whatsapp || settings.phone);

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">◆ {businessName}</div>
          <p>{settings.footerText || settings.aboutShort || settings.tagline || "Thoughtful corporate gifts for meaningful business relationships."}</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/#products">Products</Link>
          <Link href="/about/">About</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/contact/">Contact</Link>
        </div>

        <div>
          <h3>Collections</h3>
          {categories.slice(0, 6).map((category) => (
            <Link key={category.slug} href={`/products/category/${category.slug}/`}>
              {category.name}
            </Link>
          ))}
        </div>

        <div>
          <h3>Contact</h3>
          {settings.businessEmail && <a href={`mailto:${settings.businessEmail}`}>{settings.businessEmail}</a>}
          {settings.phone && <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>}
          {whatsappNumber && <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a>}
          {settings.address && <p>{settings.address}</p>}
          {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}
          {settings.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
        </div>
      </div>

      <div className="copyright">
        © {new Date().getFullYear()} {businessName}. All rights reserved.
      </div>
    </footer>
  );
}
