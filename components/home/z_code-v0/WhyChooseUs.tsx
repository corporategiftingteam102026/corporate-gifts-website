// // import "@/components/home/WhyChooseUs.css";
// // import Link from "next/link";

// // const reasons = [
// //   ["◇", "Premium Quality", "Carefully curated products you can trust."],
// //   ["✦", "Perfect for Every Occasion", "From onboarding to festive gifting."],
// //   ["◎", "Customizable Solutions", "Add your brand touch to every gift."],
// //   ["✓", "Reliable Service", "Clear coordination for corporate orders."],
// //   ["♧", "Sustainable Choices", "Thoughtful options for a better tomorrow."],
// // ];

// // export default function WhyChooseUs() {
// //   return (
// //     <section className="why-section" id="about">
// //       <span className="why-decoration why-decoration-one">✦</span>
// //       <span className="why-decoration why-decoration-two">◇</span>

// //       <div className="why-container">
// //         <div className="why-intro">
// //           <span className="why-eyebrow">Why choose us</span>

// //           <h2>
// //             Gifting that feels <em>personal,</em>
// //             <br />
// //             even at scale.
// //           </h2>

// //           <p>
// //             More than just gifts — we help you celebrate people,
// //             strengthen relationships and create lasting memories.
// //           </p>

// //           {/* <a href="#contact" className="why-button">
// //             Start Gifting
// //             <span>→</span>
// //           </a> */}
// //           <Link href="/contact/" className="why-button">
// //           Start Gifting
// //           <span>→</span>
// //           </Link>
// //         </div>

// //         <div className="why-reasons">
// //           {reasons.map(([icon, title, copy], index) => (
// //             <div
// //               className={`reason-card reason-card-${index + 1}`}
// //               key={title}
// //             >
// //               <span className="reason-number">
// //                 {String(index + 1).padStart(2, "0")}
// //               </span>

// //               <div className="reason-icon">{icon}</div>

// //               <div className="reason-content">
// //                 <h3>{title}</h3>
// //                 <p>{copy}</p>
// //               </div>

// //               <span className="reason-sparkle">✦</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }




// import "@/components/home/WhyChooseUs.css";
// import Link from "next/link";

// const basePath =
//   process.env.NODE_ENV === "production"
//     ? "/corporate-gifts-website"
//     : "";

// const reasons = [
//   {
//     image: "/images/premium-quality.png",
//     title: "Premium Quality",
//     copy: "Carefully curated products you can trust.",
//   },
//   {
//     image: "/images/every-occasion.png",
//     title: "Perfect for Every Occasion",
//     copy: "From onboarding to festive gifting.",
//   },
//   {
//     image: "/images/customizable-solutions.png",
//     title: "Customizable Solutions",
//     copy: "Add your brand touch to every gift.",
//   },
//   {
//     image: "/images/reliable-service.png",
//     title: "Reliable Service",
//     copy: "Clear coordination for corporate orders.",
//   },
//   {
//     image: "/images/sustainable-choices.png",
//     title: "Sustainable Choices",
//     copy: "Thoughtful options for a better tomorrow.",
//   },
// ];

// export default function WhyChooseUs() {
//   return (
//     <section className="why-section" id="about">
//       <span className="why-decoration why-decoration-one">✦</span>
//       <span className="why-decoration why-decoration-two">◇</span>

//       <div className="why-container">
//         <div className="why-intro">
//           <span className="why-eyebrow">Why choose us</span>

//           <h2>
//             Gifting that feels <em>personal,</em>
//             <br />
//             even at scale.
//           </h2>

//           <p>
//             More than just gifts — we help you celebrate people,
//             strengthen relationships and create lasting memories.
//           </p>

//           <Link href="/contact/" className="why-button">
//             Start Gifting
//             <span>→</span>
//           </Link>
//         </div>

//         <div className="why-reasons">
//           {reasons.map((reason, index) => (
//             <div
//               className={`reason-card reason-card-${index + 1}`}
//               key={reason.title}
//             >
//               <span className="reason-number">
//                 {String(index + 1).padStart(2, "0")}
//               </span>

//               <div className="reason-icon">
//                 <img
//                   src={`${basePath}${reason.image}`}
//                   alt=""
//                   className="reason-icon-image"
//                 />
//               </div>

//               <div className="reason-content">
//                 <h3>{reason.title}</h3>
//                 <p>{reason.copy}</p>
//               </div>

//               <span className="reason-sparkle">✦</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










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
  },
  {
    image: "/images/every-occasion.png",
    title: "Perfect for Every Occasion",
  },
  {
    image: "/images/customizable-solutions.png",
    title: "Customizable Solutions",
  },
  {
    image: "/images/reliable-service.png",
    title: "Reliable Service",
  },
  {
    image: "/images/sustainable-choices.png",
    title: "Sustainable Choices",
  },
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

          <Link href="/contact/" className="why-button">
            Start Gifting
            <span>→</span>
          </Link>
        </div>

        <div className="why-reasons">
          {reasons.map((reason, index) => (
            <div
              className={`reason-card reason-card-${index + 1}`}
              key={reason.title}
            >
              <div className="reason-image">
                <img
                  src={`${basePath}${reason.image}`}
                  alt={reason.title}
                  className="reason-image-img"
                />
              </div>

              <h3>{reason.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}