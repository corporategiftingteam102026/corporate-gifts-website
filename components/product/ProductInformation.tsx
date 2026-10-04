import type { CatalogProduct } from "@/lib/catalog-types";
import "./ProductInformation.css";

type Props = {
  product: CatalogProduct;
};

export default function ProductInformation({ product }: Props) {
  return (
    <section className="product-information">
      <div className="product-information-heading">
        <span>Product details</span>
        <h2>About this gift</h2>
      </div>

      <div className="product-information-content">
        <p>{product.description}</p>

        <div className="product-information-highlights">
          <div>
            <span>01</span>
            <strong>Corporate Ready</strong>
            <p>Suitable for employee, client and event gifting.</p>
          </div>

          <div>
            <span>02</span>
            <strong>Custom Branding</strong>
            <p>Branding options can be discussed when requesting a quote.</p>
          </div>

          <div>
            <span>03</span>
            <strong>Bulk Friendly</strong>
            <p>Designed for corporate quantities with a defined MOQ.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
