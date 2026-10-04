import "./ContactSuccess.css";

type Props = {
  name: string;
  onReset: () => void;
};

export default function ContactSuccess({ name, onReset }: Props) {
  return (
    <section className="contact-success" role="status">
      <div className="contact-success-icon" aria-hidden="true">✓</div>
      <span>Enquiry received</span>
      <h2>Thank you{name ? `, ${name}` : ""}.</h2>
      <p>
        Your enquiry has been sent successfully. Our team can now review your
        requirement and contact you using the details you provided.
      </p>

      <button type="button" onClick={onReset}>
        Send another enquiry
      </button>
    </section>
  );
}
