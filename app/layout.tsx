import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";
import "./globals.css";

const settings = getSiteSettings();
const businessName = settings.businessName || "Corporate Gifts";

export const metadata: Metadata = {
  title: `${businessName} | Corporate Gifting`,
  description: settings.aboutShort || settings.tagline || "Thoughtful corporate gifting for teams, clients and celebrations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
