



import { getFAQs } from "@/lib/faq";
import "@/components/home/FAQ.css"

export default function FAQ() {
  const faqs = getFAQs();

  if (!faqs.length) {
    return null;
  }

  return (
    <section
      className="faq-section"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="faq-anchor" />

      <div className="section-heading">
        <span className="eyebrow">
          Need to know
        </span>

        <h2 id="faq-heading">
          Frequently Asked Questions
        </h2>

        <p>
          Everything you need to know about
          corporate gifting, customization and
          placing an order.
        </p>
      </div>

      <div className="faq-grid">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              <span className="faq-question">
                {faq.question}
              </span>

              <span
                className="faq-plus"
                aria-hidden="true"
              >
                +
              </span>
            </summary>

            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}