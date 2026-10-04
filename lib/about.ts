import aboutData from "@/data/generated/about.json";

export type AboutParagraph = {
  paragraph: string;
  displayOrder: number;
  active: boolean;
};

const about =
  aboutData as AboutParagraph[];

export function getAboutParagraphs(): AboutParagraph[] {
  return [...about]
    .filter((item) => item.active)
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder
    );
}