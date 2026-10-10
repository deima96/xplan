"use client";

import Link from "next/link";
import { useContact } from "./ContactProvider";

/** Logo (left) + Contact Us button (right). Contact Us opens the staircase panel. */
export default function Navbar() {
  const { open, openPanel } = useContact();
  return (
    <header className="nav">
      <nav className="nav-inner" aria-label="Main">
        <Link href="/" className="nav-logo" aria-label="XPLAN — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="XPLAN" />
        </Link>
        <button
          type="button"
          className="nav-link"
          onClick={openPanel}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Contact Us
        </button>
      </nav>
    </header>
  );
}
