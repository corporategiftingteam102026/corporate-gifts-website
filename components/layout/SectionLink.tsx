"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

interface SectionLinkProps {
  section: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function SectionLink({
  section,
  className,
  children,
  onClick,
}: SectionLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Preserve normal browser behavior for modified clicks.
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    // Let Next.js navigate normally from other pages.
    if (pathname !== "/") {
      onClick?.();
      return;
    }

    const target = document.getElementById(section);

    if (!target) {
      return;
    }

    // We are already on the homepage.
    event.preventDefault();

    // Close the mobile menu if necessary.
    onClick?.();

    // Update the URL without reloading the page.
    window.history.pushState(
      null,
      "",
      `/#${encodeURIComponent(section)}`
    );

    // Wait for layout updates, including mobile menu closing.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  };

  return (
    <Link
      href={`/#${section}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
