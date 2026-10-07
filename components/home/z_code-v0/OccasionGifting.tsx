import styles from "./OccasionGifting.module.css";

const basePath =
  process.env.NODE_ENV === "production"
    ? "/corporate-gifts-website"
    : "";

const occasions = [
  {
    image: "/images/occasions/employee-onboarding.webp",
    title: "Employee Onboarding",
    copy: "Welcome new team members with thoughtful gifts that make day one memorable.",
  },
  {
    image: "/images/occasions/awards-recognition.webp",
    title: "Awards & Recognition",
    copy: "Celebrate achievements, milestones and the people who make them possible.",
  },
  {
    image: "/images/occasions/festive-gifting.webp",
    title: "Festive Gifting",
    copy: "Share appreciation with elegant gifts for festive and year-end celebrations.",
  },
  {
    image: "/images/occasions/client-appreciation.webp",
    title: "Client Appreciation",
    copy: "Strengthen professional relationships with gifts that say thank you with care.",
  },
  {
    image: "/images/occasions/events-conferences.webp",
    title: "Events & Conferences",
    copy: "Create a lasting impression with polished gifting for corporate events.",
  },
];

export default function OccasionGifting() {
  return (
    <section className={styles.section} aria-labelledby="occasion-gifting-title">
      {/* <span className={`${styles.sparkle} ${styles.sparkleOne}`} aria-hidden="true">
        ✦
      </span>
      <span className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true">
        ✦
      </span> */}

      <div className={styles.container}>
        <div className={styles.heading}>
          <div className={styles.eyebrowRow} aria-hidden="true">
            <span />
            {/* <i>◆</i> */}
            <span />
          </div>

          <p className={styles.eyebrow}>Gifting for every milestone</p>

          <h2 id="occasion-gifting-title">
            For every special <em>occasion</em>
          </h2>

          <p className={styles.intro}>
            From welcoming new team members to celebrating achievements,
            festivals and valued partnerships, our corporate gifts help you
            share appreciation in a thoughtful and memorable way.
          </p>
        </div>

        <div className={styles.grid}>
          {occasions.map((occasion) => (
            <article className={styles.card} key={occasion.title}>
              <div className={styles.imageWrap}>
                <img
                  className={styles.image}
                  src={`${basePath}${occasion.image}`}
                  alt=""
                  loading="lazy"
                />

                <div className={styles.imageGlow} aria-hidden="true" />

                {/* <span className={styles.miniSparkle} aria-hidden="true">
                  ✦
                </span> */}
              </div>

              <div className={styles.cardContent}>
                <h3>{occasion.title}</h3>
                <p>{occasion.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.closing}>
          Whatever the moment, choose a gift that feels considered,
          professional and worth remembering.
        </p>
      </div>
    </section>
  );
}
