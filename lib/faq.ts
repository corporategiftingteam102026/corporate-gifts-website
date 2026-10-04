import faqData from "@/data/generated/faqs.json";

export type FAQItem = {
  question: string;
  answer: string;
  displayOrder: number;
  active: boolean;
};

const faqs = faqData as FAQItem[];

export function getFAQs(): FAQItem[] {
  return [...faqs]
    .filter((faq) => faq.active)
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder
    );
}