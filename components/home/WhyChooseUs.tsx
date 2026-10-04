import "@/components/home/WhyChooseUs.css";

const reasons = [
  ["◇", "Premium Quality", "Carefully curated products you can trust."],
  ["✦", "Perfect for Every Occasion", "From onboarding to festive gifting."],
  ["◎", "Customizable Solutions", "Add your brand touch to every gift."],
  ["✓", "Reliable Service", "Clear coordination for corporate orders."],
  ["♧", "Sustainable Choices", "Thoughtful options for a better tomorrow."],
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="about">
      <span className="why-decoration why-decoration-one">✦</span>
      <span className="why-decoration why-decoration-two">◇</span>

      <div className="why-container">
        <div className="why-intro">
          <span className="why-eyebrow">Why choose us</span>

          <h2>
            Gifting that feels <em>personal,</em>
            <br />
            even at scale.
          </h2>

          <p>
            More than just gifts — we help you celebrate people,
            strengthen relationships and create lasting memories.
          </p>

          <a href="#contact" className="why-button">
            Start Gifting
            <span>→</span>
          </a>
        </div>

        <div className="why-reasons">
          {reasons.map(([icon, title, copy], index) => (
            <div
              className={`reason-card reason-card-${index + 1}`}
              key={title}
            >
              <span className="reason-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="reason-icon">{icon}</div>

              <div className="reason-content">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>

              <span className="reason-sparkle">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}