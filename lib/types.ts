export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  active: boolean;
};

export type Product = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  image: string;
  startingPrice: number;
  moq: number;
  featured: boolean;
  trending: boolean;
  displayOrder: number;
  active: boolean;
};

export type FAQItem = { question: string; answer: string };
