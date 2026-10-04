import type { CatalogVariant } from "@/lib/catalog-types";
import "./VariantSelector.css";

type Props = {
  variants: CatalogVariant[];
  selectedVariantSlug: string;
  onSelect: (slug: string) => void;
};

export default function VariantSelector({
  variants,
  selectedVariantSlug,
  onSelect,
}: Props) {
  const activeVariants = variants.filter((variant) => variant.active);
  const selectedVariant =
    activeVariants.find((variant) => variant.slug === selectedVariantSlug) ??
    activeVariants[0];

  if (!activeVariants.length) {
    return null;
  }

  return (
    <div className="variant-selector">
      <div className="variant-selector-heading">
        <span>Colour</span>
        <strong>{selectedVariant?.colorName}</strong>
      </div>

      <div className="variant-options">
        {activeVariants.map((variant) => {
          const selected = variant.slug === selectedVariant?.slug;
          const thumbnail = variant.images[0];

          return (
            <button
              key={variant.slug}
              type="button"
              className={`variant-option ${selected ? "is-selected" : ""}`}
              aria-label={`Select ${variant.colorName}`}
              aria-pressed={selected}
              onClick={() => onSelect(variant.slug)}
            >
              <span className="variant-circle">
                {thumbnail ? (
                  <img src={thumbnail} alt="" />
                ) : (
                  <i
                    style={{
                      backgroundColor: variant.colorHex || "#e6d9cf",
                    }}
                  />
                )}
              </span>

              <span className="variant-name">{variant.colorName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
