// // export type Category={slug:string;name:string;description:string;displayOrder:number;active:boolean;image?:string};
// // export type Variant={slug:string;colorName:string;colorHex?:string;priceOverride?:number;isDefault:boolean;active:boolean;images:string[]};
// // export type Product={slug:string;name:string;categorySlug:string;shortDescription:string;description:string;startingPrice?:number;moq:number;featured:boolean;trending:boolean;displayOrder:number;active:boolean;image?:string;variants:Variant[]};
// // export type Catalog={categories:Category[];products:Product[]};
// // export type SiteSettings={businessName:string;tagline:string;businessEmail:string;phone:string;whatsapp:string;address:string;instagram:string;linkedin:string;aboutShort:string;footerText:string};





// export type Category = {
//     slug: string;
//     name: string;
//     description: string;
//     displayOrder: number;
//     active: boolean;
//     image?: string;
//   };
  
//   export type Variant = {
//     slug: string;
//     colorName: string;
//     colorHex?: string;
//     priceOverride?: number;
//     isDefault: boolean;
//     active: boolean;
//     images: string[];
//   };
  
//   export type Product = {
//     slug: string;
//     name: string;
//     categorySlug: string;
//     shortDescription: string;
//     description: string;
//     startingPrice?: number;
//     moq: number;
//     featured: boolean;
//     trending: boolean;
//     displayOrder: number;
//     active: boolean;
//     image?: string;
//     variants: Variant[];
//   };
  
//   export type Catalog = {
//     categories: Category[];
//     products: Product[];
//   };
  
//   export type FAQ = {
//     question: string;
//     answer: string;
//     displayOrder: number;
//     active: boolean;
//   };
  
//   export type AboutParagraph = {
//     paragraph: string;
//     displayOrder: number;
//     active: boolean;
//   };
  
//   export type SiteSettings = {
//     businessName: string;
//     tagline: string;
//     businessEmail: string;
//     phone: string;
//     whatsapp: string;
//     address: string;
//     instagram: string;
//     linkedin: string;
//     aboutShort: string;
//     footerText: string;
//   };








export type Category = {
    slug: string;
    name: string;
    description: string;
    displayOrder: number;
    active: boolean;
    image?: string;
  };
  
  export type Variant = {
    slug: string;
    colorName: string;
    colorHex?: string;
    priceOverride?: number;
    isDefault: boolean;
    active: boolean;
    images: string[];
  };
  
  export type Product = {
    slug: string;
    name: string;
    categorySlug: string;
    shortDescription: string;
    description: string;
    startingPrice?: number;
    moq: number;
    featured: boolean;
    trending: boolean;
    displayOrder: number;
    active: boolean;
  
    // Main product image.
    // For products with variants, this comes from the default variant.
    // For products without variants, this comes directly from Products/<Product>/1.*
    image?: string;
  
    variants: Variant[];
  };
  
  export type Catalog = {
    categories: Category[];
    products: Product[];
  };
  
  export type FAQ = {
    question: string;
    answer: string;
    displayOrder: number;
    active: boolean;
  };
  
  export type AboutParagraph = {
    paragraph: string;
    displayOrder: number;
    active: boolean;
  };
  
  export type SiteSettings = {
    businessName: string;
    tagline: string;
    businessEmail: string;
    phone: string;
    whatsapp: string;
    address: string;
    instagram: string;
    linkedin: string;
    aboutShort: string;
    footerText: string;
  };
