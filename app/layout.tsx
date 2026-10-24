import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

const settings = getSiteSettings();
const businessName = "Sumuk Gifts";

export const metadata: Metadata = {
  title: "Sumuk Gifts",
  description: settings.aboutShort || settings.tagline || "Thoughtful corporate gifting for teams, clients and celebrations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
