import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import BusinessContactDetails from "@/components/contact/BusinessContactDetails";
import EnquiryForm from "@/components/contact/EnquiryForm";
import { getSiteSettings } from "@/lib/site-settings";
import "./contact-page.css";

export default function ContactPage() {
  const settings = getSiteSettings();

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <ContactHeader businessName={settings.businessName} tagline={settings.tagline} />
        <section className="contact-content-section">
          <div className="contact-content-shell">
          <Suspense fallback={<div className="enquiry-loading">Loading enquiry form…</div>}>
              <EnquiryForm />
            </Suspense>
            <div className="contact-divider" aria-hidden="true">
              <span /><strong>OR Contact us yourself</strong><span />
            </div>
            
            <BusinessContactDetails settings={settings} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
