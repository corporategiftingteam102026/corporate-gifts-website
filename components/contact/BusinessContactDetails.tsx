import type { SiteSettings } from "@/lib/site-settings";
import "./BusinessContactDetails.css";

type Props = {
  settings: SiteSettings;
};

function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, "");
}

export default function BusinessContactDetails({ settings }: Props) {
  const whatsappNumber = digitsOnly(settings.whatsapp || settings.phone);

  return (
    <section className="business-contact">
      <div className="business-contact-heading">
        <span>Get in touch</span>
        <h2>We&apos;re here to help with your gifting requirements.</h2>
        <p>
          Prefer to speak with us directly? Use any of the contact options
          below and our team can help you plan the right gifts.
        </p>
      </div>

      <div className="business-contact-grid">
        {settings.businessEmail && (
          <a
            className="business-contact-card"
            href={`mailto:${settings.businessEmail}`}
          >
            <div className="business-contact-icon" aria-hidden="true">✉</div>
            <span>Email</span>
            <strong>{settings.businessEmail}</strong>
            <small>Send us an email →</small>
          </a>
        )}

        {settings.phone && (
          <a
            className="business-contact-card"
            href={`tel:${settings.phone.replace(/\s/g, "")}`}
          >
            <div className="business-contact-icon" aria-hidden="true">☎</div>
            <span>Phone</span>
            <strong>{settings.phone}</strong>
            <small>Call us →</small>
          </a>
        )}

        {whatsappNumber && (
          <a
            className="business-contact-card"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="business-contact-icon" aria-hidden="true">◉</div>
            <span>WhatsApp</span>
            <strong>{settings.whatsapp || settings.phone}</strong>
            <small>Message us →</small>
          </a>
        )}

        {settings.address && (
          <div className="business-contact-card is-static">
            <div className="business-contact-icon" aria-hidden="true">⌖</div>
            <span>Address</span>
            <strong>{settings.address}</strong>
            <small>{settings.businessName}</small>
          </div>
        )}
      </div>

      {(settings.instagram || settings.linkedin) && (
        <div className="business-social-links">
          <span>Connect with us</span>

          <div>
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
            )}

            {settings.linkedin && (
              <a href={settings.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
