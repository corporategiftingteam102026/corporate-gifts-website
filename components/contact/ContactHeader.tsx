import "./ContactHeader.css";

type Props = {
  businessName: string;
  tagline?: string;
};

export default function ContactHeader({ businessName, tagline }: Props) {
  return (
    <section className="contact-header">
      <span className="contact-header-star star-one" aria-hidden="true">✦</span>
      <span className="contact-header-star star-two" aria-hidden="true">◇</span>
      <div className="contact-header-shell">
        <span className="contact-header-eyebrow">Contact us</span>
        <h1>Let&apos;s create something thoughtful.</h1>
        <p>
          Planning gifts for your team, clients or an upcoming celebration? Reach out to {businessName || "our team"} directly or send us your requirements and we&apos;ll get back to you.
          {tagline ? ` ${tagline}` : ""}
        </p>
      </div>
    </section>
  );
}
