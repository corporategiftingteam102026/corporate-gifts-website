// // import {createSlug} from "./slug";
// //  import type {Category,Product,SiteSettings,Variant} from "./types";


// import { createSlug } from "./slug";

// import type {
//   AboutParagraph,
//   Category,
//   FAQ,
//   Product,
//   SiteSettings,
//   Variant,
// } from "./types";

// const text=(v:any)=>typeof v==="string"?v.trim():v==null?"":String(v).trim(); const bool=(v:any)=>typeof v==="boolean"?v:["true","yes","1"].includes(text(v).toLowerCase())?true:["false","no","0"].includes(text(v).toLowerCase())?false:null; const num=(v:any)=>typeof v==="number"&&Number.isFinite(v)?v:(text(v)!==""&&Number.isFinite(Number(text(v).replace(/,/g,"")))?Number(text(v).replace(/,/g,"")):null);
// export function parseCategories(rows:any[][]):Category[]{const out:Category[]=[];for(let i=1;i<rows.length;i++){const r=rows[i],name=text(r[0]);if(!name)continue;const d=text(r[1]),o=num(r[2]),a=bool(r[3]);if(!d||o===null||!Number.isInteger(o)||o<0||a===null){console.warn(`⏭ [CATEGORY SKIPPED] "${name}": invalid required data.`);continue}if(!a)continue;out.push({slug:createSlug(name),name,description:d,displayOrder:o,active:a});}return uniqueOrders(out,"CATEGORY");}
// export function parseProducts(rows:any[][],cats:Category[]):Product[]{const out:Product[]=[];for(let i=1;i<rows.length;i++){const r=rows[i],name=text(r[0]);if(!name)continue;const cat=cats.find(c=>c.name===text(r[1]));const sp=text(r[4])===""?undefined:num(r[4]);const moq=num(r[5]),f=bool(r[6]),t=bool(r[7]),o=num(r[8]),a=bool(r[9]);if(!cat||!text(r[2])||!text(r[3])||(sp!==undefined&&(sp===null||sp<0))||moq===null||!Number.isInteger(moq)||moq<=0||f===null||t===null||o===null||!Number.isInteger(o)||o<0||a===null){console.warn(`⏭ [PRODUCT SKIPPED] "${name}": invalid required data.`);continue}if(!a)continue;out.push({slug:createSlug(name),name,categorySlug:cat.slug,shortDescription:text(r[2]),description:text(r[3]),startingPrice:sp as number|undefined,moq,featured:f,trending:t,displayOrder:o,active:a,variants:[]});}for(const c of cats){const group=uniqueOrders(out.filter(p=>p.categorySlug===c.slug),`PRODUCT:${c.slug}`);group.forEach(g=>{const x=out.find(p=>p.slug===g.slug);if(x)x.displayOrder=g.displayOrder})}return out;}
// export function attachVariants(rows:any[][],products:Product[]){for(let i=1;i<rows.length;i++){const r=rows[i],pn=text(r[0]),cn=text(r[1]);if(!pn&&!cn)continue;const p=products.find(x=>x.name===pn);const po=text(r[3])===""?undefined:num(r[3]),def=bool(r[4]),a=bool(r[5]);if(!p||!cn||(po!==undefined&&(po===null||po<0))||def===null||a===null){console.warn(`⏭ [VARIANT SKIPPED] "${cn||"(unnamed)"}": invalid required data.`);continue}if(!a)continue;const hex=text(r[2]);const v:Variant={slug:`${p.slug}--${createSlug(cn)}`,colorName:cn,priceOverride:po as number|undefined,isDefault:def,active:a,images:[]};if(hex)v.colorHex=hex;p.variants.push(v)}for(const p of products){if(!p.variants.length){console.warn(`⚠ [PRODUCT] "${p.name}": Product has no valid active variants.`);continue}const defs=p.variants.filter(v=>v.isDefault);if(!defs.length)p.variants[0].isDefault=true;else defs.slice(1).forEach(v=>v.isDefault=false)}}
// export function parseSiteSettings(rows:any[][]):SiteSettings{const m=new Map<string,string>();for(let i=1;i<rows.length;i++){const k=text(rows[i][0]);if(!k)continue;if(!m.has(k))m.set(k,text(rows[i][1]));}const g=(k:string)=>m.get(k)||"";if(!g("Business Name"))console.warn('⚠ [WEBSITE SETTING] "Business Name": Business Name is missing or invalid.');return{businessName:g("Business Name"),tagline:g("Tagline"),businessEmail:g("Business Email"),phone:g("Phone"),whatsapp:g("WhatsApp"),address:g("Address"),instagram:g("Instagram"),linkedin:g("LinkedIn"),aboutShort:g("About Short"),footerText:g("Footer Text")};}
// function uniqueOrders<T extends {name:string;displayOrder:number}>(items:T[],scope:string){const used=new Set<number>();let next=Math.max(-1,...items.map(x=>x.displayOrder))+1;return items.sort((a,b)=>a.displayOrder-b.displayOrder).map(x=>{if(!used.has(x.displayOrder)){used.add(x.displayOrder);return x}while(used.has(next))next++;console.warn(`🔧 [${scope} AUTO-CORRECTED] "${x.name}": Display Order ${x.displayOrder} is already used. Generated data will use ${next}.`);const y={...x,displayOrder:next};used.add(next++);return y})}

// export function parseFAQs(rows: any[][]): FAQ[] {
//     const faqs: FAQ[] = [];
  
//     for (let i = 1; i < rows.length; i++) {
//       const row = rows[i];
  
//       const question = text(row[0]);
  
//       // Completely unused/preformatted row.
//       if (!question) {
//         continue;
//       }
  
//       const answer = text(row[1]);
//       const displayOrder = num(row[2]);
//       const active = bool(row[3]);
  
//       if (
//         !answer ||
//         displayOrder === null ||
//         !Number.isInteger(displayOrder) ||
//         displayOrder < 0 ||
//         active === null
//       ) {
//         console.warn(
//           `⏭ [FAQ SKIPPED] "${question}": invalid required data.`
//         );
//         continue;
//       }
  
//       if (!active) {
//         continue;
//       }
  
//       faqs.push({
//         question,
//         answer,
//         displayOrder,
//         active,
//       });
//     }
  
//     return faqs.sort(
//       (a, b) => a.displayOrder - b.displayOrder
//     );
//   }
  
//   export function parseAbout(
//     rows: any[][]
//   ): AboutParagraph[] {
//     const paragraphs: AboutParagraph[] = [];
  
//     for (let i = 1; i < rows.length; i++) {
//       const row = rows[i];
  
//       const paragraph = text(row[0]);
  
//       // Completely unused/preformatted row.
//       if (!paragraph) {
//         continue;
//       }
  
//       const displayOrder = num(row[1]);
//       const active = bool(row[2]);
  
//       if (
//         displayOrder === null ||
//         !Number.isInteger(displayOrder) ||
//         displayOrder < 0 ||
//         active === null
//       ) {
//         console.warn(
//           `⏭ [ABOUT SKIPPED] Row ${
//             i + 1
//           }: invalid required data.`
//         );
//         continue;
//       }
  
//       if (!active) {
//         continue;
//       }
  
//       paragraphs.push({
//         paragraph,
//         displayOrder,
//         active,
//       });
//     }
  
//     return paragraphs.sort(
//       (a, b) => a.displayOrder - b.displayOrder
//     );
//   }








import { createSlug } from "./slug";

import type {
  AboutParagraph,
  Category,
  FAQ,
  Product,
  SiteSettings,
  Variant,
} from "./types";

const text = (value: any): string => {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value == null) {
    return "";
  }

  return String(value).trim();
};

const bool = (value: any): boolean | null => {
  if (typeof value === "boolean") {
    return value;
  }

  const normalized =
    text(value).toLowerCase();

  if (
    ["true", "yes", "1"].includes(normalized)
  ) {
    return true;
  }

  if (
    ["false", "no", "0"].includes(normalized)
  ) {
    return false;
  }

  return null;
};

const num = (value: any): number | null => {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  const normalized =
    text(value).replace(/,/g, "");

  if (
    normalized !== "" &&
    Number.isFinite(Number(normalized))
  ) {
    return Number(normalized);
  }

  return null;
};

/* =======================================================
   CATEGORIES
======================================================= */

export function parseCategories(
  rows: any[][]
): Category[] {
  const categories: Category[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const name = text(row[0]);

    // Ignore completely unused/preformatted rows.
    if (!name) {
      continue;
    }

    const description = text(row[1]);
    const displayOrder = num(row[2]);
    const active = bool(row[3]);

    if (
      !description ||
      displayOrder === null ||
      !Number.isInteger(displayOrder) ||
      displayOrder < 0 ||
      active === null
    ) {
      console.warn(
        `⏭ [CATEGORY SKIPPED] "${name}": invalid required data.`
      );
      continue;
    }

    if (!active) {
      continue;
    }

    categories.push({
      slug: createSlug(name),
      name,
      description,
      displayOrder,
      active,
    });
  }

  return uniqueOrders(
    categories,
    "CATEGORY"
  );
}

/* =======================================================
   PRODUCTS
======================================================= */

export function parseProducts(
  rows: any[][],
  categories: Category[]
): Product[] {
  const products: Product[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const name = text(row[0]);

    // Ignore unused/preformatted rows.
    if (!name) {
      continue;
    }

    const categoryName = text(row[1]);

    const category =
      categories.find(
        (item) =>
          item.name === categoryName
      );

    const shortDescription =
      text(row[2]);

    const description =
      text(row[3]);

    const startingPrice =
      text(row[4]) === ""
        ? undefined
        : num(row[4]);

    const moq = num(row[5]);
    const featured = bool(row[6]);
    const trending = bool(row[7]);
    const displayOrder = num(row[8]);
    const active = bool(row[9]);

    if (
      !category ||
      !shortDescription ||
      !description ||
      (startingPrice !== undefined &&
        (startingPrice === null ||
          startingPrice < 0)) ||
      moq === null ||
      !Number.isInteger(moq) ||
      moq <= 0 ||
      featured === null ||
      trending === null ||
      displayOrder === null ||
      !Number.isInteger(displayOrder) ||
      displayOrder < 0 ||
      active === null
    ) {
      console.warn(
        `⏭ [PRODUCT SKIPPED] "${name}": invalid required data.`
      );
      continue;
    }

    if (!active) {
      continue;
    }

    products.push({
      slug: createSlug(name),
      name,
      categorySlug: category.slug,
      shortDescription,
      description,
      startingPrice:
        startingPrice as
          | number
          | undefined,
      moq,
      featured,
      trending,
      displayOrder,
      active,
      variants: [],
    });
  }

  /*
   * Product display order only needs to be
   * unique inside its own category.
   */
  for (const category of categories) {
    const categoryProducts =
      products.filter(
        (product) =>
          product.categorySlug ===
          category.slug
      );

    const corrected = uniqueOrders(
      categoryProducts,
      `PRODUCT:${category.slug}`
    );

    for (const correctedProduct of corrected) {
      const original =
        products.find(
          (product) =>
            product.slug ===
            correctedProduct.slug
        );

      if (original) {
        original.displayOrder =
          correctedProduct.displayOrder;
      }
    }
  }

  return products;
}

/* =======================================================
   VARIANTS
======================================================= */

export function attachVariants(
  rows: any[][],
  products: Product[]
): void {
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const productName =
      text(row[0]);

    const colorName =
      text(row[1]);

    // Completely unused/preformatted row.
    if (!productName && !colorName) {
      continue;
    }

    const product =
      products.find(
        (item) =>
          item.name === productName
      );

    const colorHex =
      text(row[2]);

    const priceOverride =
      text(row[3]) === ""
        ? undefined
        : num(row[3]);

    const isDefault =
      bool(row[4]);

    const active =
      bool(row[5]);

    if (
      !product ||
      !colorName ||
      (priceOverride !== undefined &&
        (priceOverride === null ||
          priceOverride < 0)) ||
      isDefault === null ||
      active === null
    ) {
      console.warn(
        `⏭ [VARIANT SKIPPED] "${
          colorName || "(unnamed)"
        }": invalid required data.`
      );
      continue;
    }

    if (!active) {
      continue;
    }

    const variant: Variant = {
      slug:
        `${product.slug}--${createSlug(
          colorName
        )}`,
      colorName,
      priceOverride:
        priceOverride as
          | number
          | undefined,
      isDefault,
      active,
      images: [],
    };

    if (colorHex) {
      variant.colorHex = colorHex;
    }

    product.variants.push(variant);
  }

  for (const product of products) {
    /*
     * IMPORTANT:
     * A product is now allowed to have ZERO variants.
     *
     * In that case drive.ts will look for:
     *
     * Products/
     *   Product Name/
     *     1.jpg
     *     2.jpg
     *
     * Therefore this is informational only.
     */
    if (!product.variants.length) {
      console.log(
        `ℹ [PRODUCT] "${product.name}": no active variants; direct product images will be used.`
      );
      continue;
    }

    const defaults =
      product.variants.filter(
        (variant) =>
          variant.isDefault
      );

    if (!defaults.length) {
      product.variants[0].isDefault =
        true;
    } else if (defaults.length > 1) {
      defaults
        .slice(1)
        .forEach(
          (variant) => {
            variant.isDefault =
              false;
          }
        );

      console.warn(
        `🔧 [PRODUCT] "${product.name}": multiple default variants found. Only the first default was kept.`
      );
    }
  }
}

/* =======================================================
   FAQ
======================================================= */

export function parseFAQs(
  rows: any[][]
): FAQ[] {
  const faqs: FAQ[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const question =
      text(row[0]);

    // Ignore unused/preformatted rows.
    if (!question) {
      continue;
    }

    const answer =
      text(row[1]);

    const displayOrder =
      num(row[2]);

    const active =
      bool(row[3]);

    if (
      !answer ||
      displayOrder === null ||
      !Number.isInteger(displayOrder) ||
      displayOrder < 0 ||
      active === null
    ) {
      console.warn(
        `⏭ [FAQ SKIPPED] "${question}": invalid required data.`
      );
      continue;
    }

    if (!active) {
      continue;
    }

    faqs.push({
      question,
      answer,
      displayOrder,
      active,
    });
  }

  return uniqueDisplayOrders(
    faqs,
    "FAQ",
    (faq) => faq.question
  );
}

/* =======================================================
   ABOUT
======================================================= */

export function parseAbout(
  rows: any[][]
): AboutParagraph[] {
  const paragraphs:
    AboutParagraph[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    const paragraph =
      text(row[0]);

    // Ignore unused/preformatted rows.
    if (!paragraph) {
      continue;
    }

    const displayOrder =
      num(row[1]);

    const active =
      bool(row[2]);

    if (
      displayOrder === null ||
      !Number.isInteger(displayOrder) ||
      displayOrder < 0 ||
      active === null
    ) {
      console.warn(
        `⏭ [ABOUT SKIPPED] Row ${
          i + 1
        }: invalid required data.`
      );
      continue;
    }

    if (!active) {
      continue;
    }

    paragraphs.push({
      paragraph,
      displayOrder,
      active,
    });
  }

  return uniqueDisplayOrders(
    paragraphs,
    "ABOUT",
    (_item, index) =>
      `Paragraph ${index + 1}`
  );
}

/* =======================================================
   WEBSITE SETTINGS
======================================================= */

export function parseSiteSettings(
  rows: any[][]
): SiteSettings {
  const settings =
    new Map<string, string>();

  for (let i = 1; i < rows.length; i++) {
    const key =
      text(rows[i][0]);

    if (!key) {
      continue;
    }

    if (!settings.has(key)) {
      settings.set(
        key,
        text(rows[i][1])
      );
    }
  }

  const get = (key: string) =>
    settings.get(key) || "";

  if (!get("Business Name")) {
    console.warn(
      '⚠ [WEBSITE SETTING] "Business Name": Business Name is missing or invalid.'
    );
  }

  return {
    businessName:
      get("Business Name"),

    tagline:
      get("Tagline"),

    businessEmail:
      get("Business Email"),

    phone:
      get("Phone"),

    whatsapp:
      get("WhatsApp"),

    address:
      get("Address"),

    instagram:
      get("Instagram"),

    linkedin:
      get("LinkedIn"),

    aboutShort:
      get("About Short"),

    footerText:
      get("Footer Text"),
  };
}

/* =======================================================
   ORDER HELPERS
======================================================= */

function uniqueOrders<
  T extends {
    name: string;
    displayOrder: number;
  }
>(
  items: T[],
  scope: string
): T[] {
  const used =
    new Set<number>();

  let next =
    Math.max(
      -1,
      ...items.map(
        (item) =>
          item.displayOrder
      )
    ) + 1;

  return [...items]
    .sort(
      (a, b) =>
        a.displayOrder -
        b.displayOrder
    )
    .map((item) => {
      if (
        !used.has(
          item.displayOrder
        )
      ) {
        used.add(
          item.displayOrder
        );

        return item;
      }

      while (
        used.has(next)
      ) {
        next++;
      }

      console.warn(
        `🔧 [${scope} AUTO-CORRECTED] "${item.name}": Display Order ${item.displayOrder} is already used. Generated data will use ${next}.`
      );

      const corrected = {
        ...item,
        displayOrder: next,
      };

      used.add(next);
      next++;

      return corrected;
    });
}

function uniqueDisplayOrders<
  T extends {
    displayOrder: number;
  }
>(
  items: T[],
  scope: string,
  getLabel: (
    item: T,
    index: number
  ) => string
): T[] {
  const sorted =
    [...items].sort(
      (a, b) =>
        a.displayOrder -
        b.displayOrder
    );

  const used =
    new Set<number>();

  let next =
    Math.max(
      -1,
      ...sorted.map(
        (item) =>
          item.displayOrder
      )
    ) + 1;

  return sorted.map(
    (item, index) => {
      if (
        !used.has(
          item.displayOrder
        )
      ) {
        used.add(
          item.displayOrder
        );

        return item;
      }

      while (
        used.has(next)
      ) {
        next++;
      }

      console.warn(
        `🔧 [${scope} AUTO-CORRECTED] "${getLabel(
          item,
          index
        )}": Display Order ${
          item.displayOrder
        } is already used. Generated data will use ${next}.`
      );

      const corrected = {
        ...item,
        displayOrder: next,
      };

      used.add(next);
      next++;

      return corrected;
    }
  );
}