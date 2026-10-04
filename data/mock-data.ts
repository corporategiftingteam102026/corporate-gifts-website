import type { Category, FAQItem, Product } from "@/lib/types";
import { hasRequiredFields } from "@/lib/validation";

const rawCategories: Category[] = [
  { name: "Welcome Kits", slug: "welcome-kits", description: "Curated onboarding kits that make every new beginning memorable.", image: "/images/mock/welcome-kit.svg", displayOrder: 1, active: true },
  { name: "Gift Hampers", slug: "gift-hampers", description: "Premium festive and appreciation hampers for teams and clients.", image: "/images/mock/gift-hamper.svg", displayOrder: 2, active: true },
  { name: "Drinkware", slug: "drinkware", description: "Custom mugs, bottles and tumblers for everyday brand visibility.", image: "/images/mock/drinkware.svg", displayOrder: 3, active: true },
  { name: "Desk Essentials", slug: "desk-essentials", description: "Useful desk accessories designed for modern workspaces.", image: "/images/mock/desk.svg", displayOrder: 4, active: true },
  { name: "Apparel & Accessories", slug: "apparel-accessories", description: "Branded apparel and accessories your teams will actually use.", image: "/images/mock/apparel.svg", displayOrder: 5, active: true },
  { name: "Tech Gadgets", slug: "tech-gadgets", description: "Practical technology gifts for connected teams.", image: "/images/mock/tech.svg", displayOrder: 6, active: true },
  { name: "Eco-Friendly Gifts", slug: "eco-friendly-gifts", description: "Thoughtful sustainable gifting choices with a lighter footprint.", image: "/images/mock/eco.svg", displayOrder: 7, active: true },
  { name: "Custom Gifts", slug: "custom-gifts", description: "Personalized gifting solutions built around your brand and occasion.", image: "/images/mock/custom.svg", displayOrder: 8, active: true },
];

const rawProducts: Product[] = [
  { name: "Premium Gift Box", slug: "premium-gift-box", category: "Gift Hampers", shortDescription: "A refined hamper for milestones and celebrations.", image: "/images/mock/gift-hamper.svg", startingPrice: 1999, moq: 10, featured: true, trending: true, displayOrder: 1, active: true },
  { name: "Customized Mug", slug: "customized-mug", category: "Drinkware", shortDescription: "A clean ceramic mug ready for your brand identity.", image: "/images/mock/drinkware.svg", startingPrice: 299, moq: 50, featured: false, trending: true, displayOrder: 2, active: true },
  { name: "Employee Welcome Kit", slug: "employee-welcome-kit", category: "Welcome Kits", shortDescription: "A polished onboarding kit for new team members.", image: "/images/mock/welcome-kit.svg", startingPrice: 1499, moq: 25, featured: true, trending: true, displayOrder: 3, active: true },
  { name: "Eco Gift Set", slug: "eco-gift-set", category: "Eco-Friendly Gifts", shortDescription: "Sustainable essentials presented as one thoughtful set.", image: "/images/mock/eco.svg", startingPrice: 1099, moq: 25, featured: true, trending: true, displayOrder: 4, active: true },
  { name: "Notebook & Pen Set", slug: "notebook-pen-set", category: "Desk Essentials", shortDescription: "A timeless corporate desk gift with customization options.", image: "/images/mock/desk.svg", startingPrice: 799, moq: 30, featured: false, trending: true, displayOrder: 5, active: true },
];

const categoryRequired: (keyof Category)[] = ["name", "slug", "description", "image", "displayOrder", "active"];
const productRequired: (keyof Product)[] = ["name", "slug", "category", "shortDescription", "image", "startingPrice", "moq", "featured", "trending", "displayOrder", "active"];

export const categories = rawCategories.filter((x) => x.active && hasRequiredFields(x, categoryRequired)).sort((a,b) => a.displayOrder-b.displayOrder);
export const products = rawProducts.filter((x) => x.active && hasRequiredFields(x, productRequired)).sort((a,b) => a.displayOrder-b.displayOrder);
export const trendingProducts = products.filter((x) => x.trending);

export const faqs: FAQItem[] = [
  { question: "Can we customize the gifts with our logo?", answer: "Yes. Branding and customization can be planned based on the product, quantity and your brand guidelines." },
  { question: "What is the delivery timeline?", answer: "Timelines depend on product availability, customization and quantity. We confirm the expected dispatch schedule before finalizing an order." },
  { question: "What is the minimum order quantity?", answer: "MOQ varies by product. The product catalogue can display the minimum quantity for each item." },
  { question: "Do you offer eco-friendly gifting options?", answer: "Yes. Sustainable gifting options can include reusable, recycled and lower-waste products." },
  { question: "Do you provide bulk discounts?", answer: "Bulk pricing can be quoted based on the selected products, customization and order quantity." },
  { question: "Can you help with gift selection for specific occasions?", answer: "Yes. Gifts can be curated around onboarding, festivals, client appreciation, milestones and other corporate occasions." },
];
