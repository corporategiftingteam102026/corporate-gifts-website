import "@/components/home/WhyChooseUs.css";
import Link from "next/link";

const basePath =
  process.env.NODE_ENV === "production"
    ? "/corporate-gifts-website"
    : "";

const reasons = [
  {
    image: "/images/premium-quality.png",
    title: "Premium Quality",
    copy: "Carefully curated products you can trust.",
  },
  {
    image: "/images/every-occasion.png",
    title: "Perfect for Every Occasion",
    copy: "From onboarding to festive gifting.",
  },
  {
    image: "/images/customizable-solutions.png",
    title: "Customizable Solutions",
    copy: "Add your brand touch to every gift.",
  },
  {
    image: "/images/reliable-service.png",
    title: "Reliable Service",
    copy: "Clear coordination for corporate orders.",
  },
  {
    image: "/images/sustainable-choices.png",
    title: "Sustainable Choices",
    copy: "Thoughtful options for a better tomorrow.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="about">
      <span className="why-decoration why-decoration-one" aria-hidden="true">
        ✦
      </span>
      <span className="why-decoration why-decoration-two" aria-hidden="true">
        ◇
      </span>

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

          <Link href="/contact/" className="why-button">
            Start Gifting
            <span>→</span>
          </Link>
        </div>

        <div className="why-reasons">
          {reasons.map((reason, index) => (
            <article
              className={`reason-card reason-card-${index + 1}`}
              key={reason.title}
            >
              <span className="reason-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="reason-visual" aria-hidden="true">
                <span className="reason-image-halo" />
                <img
                  src={`${basePath}${reason.image}`}
                  alt=""
                  className="reason-image-img"
                />
              </div>

              <div className="reason-content">
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
              </div>

              <span className="reason-accent" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
