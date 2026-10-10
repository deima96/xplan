import BackgroundVideo from "@/components/BackgroundVideo";
import ContactPanel from "@/components/ContactPanel";
import { ContactProvider } from "@/components/ContactProvider";
import HeroOverlay from "@/components/HeroOverlay";
import Navbar from "@/components/Navbar";

export default function Landing() {
  return (
    <ContactProvider>
      <main className="home">
        {/* 1. your video */}
        <div className="bg">
          <BackgroundVideo
            src="/videos/home.mp4"
            poster="/posters/home.jpg"
            className="bg-video"
            controlClassName="motion-home"
          />
        </div>
        <div className="shade" aria-hidden="true" />
        {/* 2. your SVG: grid lines + text */}
        <div className="stage">
          <HeroOverlay />
        </div>
        {/* Portrait phones: same grid + text, re-flowed (the SVG is hidden there) */}
        <div className="mobile-overlay" aria-hidden="true">
          <i className="m-v m-v1" />
          <i className="m-v m-v2" />
          <i className="m-h" />
          <p className="m-hello">Hello!</p>
          <p className="m-tagline">
            We&apos;re doing what we do best. Planning &amp; Constructing.
          </p>
          <p className="m-note">
            While we build something exciting here, feel free to reach out to
            us.
          </p>
        </div>
        {/* 3. logo + Contact Us */}
        <Navbar />
        <h1 className="sr-only">XPLAN — Hello! Planning &amp; Constructing.</h1>
        {/* 4. staircase contact panel */}
        <ContactPanel />
      </main>
    </ContactProvider>
  );
}
