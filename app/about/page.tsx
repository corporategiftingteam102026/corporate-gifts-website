import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getAboutParagraphs } from "@/lib/about";
import Link from "next/link";

import "@/app/about/about-page.css"


export default function AboutPage() {
  const paragraphs =
    getAboutParagraphs();

  return (
    <>
      <Navbar />

      <main className="about-page">
        <section className="about-hero">
          <div className="about-hero-decoration about-decoration-left">
            ✦
          </div>

          <div className="about-hero-inner">
            <span className="eyebrow">
              Our story
            </span>

            <h1>
              Thoughtful gifting.
              <br />
              Meaningful connections.
            </h1>

            <p>
              Creating memorable gifting
              experiences for the people who
              matter to your business.
            </p>
          </div>

          <div className="about-hero-decoration about-decoration-right">
            ✦
          </div>
        </section>

        <section className="about-story">
          <div className="about-story-label">
            <span className="eyebrow">
              About us
            </span>

            <div className="about-story-mark">
              ◇
            </div>
          </div>

          <div className="about-copy">
            {paragraphs.length > 0 ? (
              paragraphs.map((item) => (
                <p
                  key={`${item.displayOrder}-${item.paragraph}`}
                >
                  {item.paragraph}
                </p>
              ))
            ) : (
              <p>
                Our story is being prepared.
                Please check back soon.
              </p>
            )}
          </div>
        </section>

        <section className="about-closing">
          <div className="about-closing-inner">
            <span aria-hidden="true">
              ✦
            </span>

            <h2>
              Celebrate people.
              Strengthen relationships.
            </h2>

            <p>
              From meaningful milestones to
              everyday appreciation, thoughtful
              gifting leaves a lasting impression.
            </p>

            {/* <a
              href="/contact/"
              className="primary-button"
            >
              Plan Your Gifting
            </a> */}
            <Link href="/contact/" className="primary-button">
            Plan Your Gifting
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}