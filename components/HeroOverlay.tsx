/**
 * Grid lines + text from design/XPLAN-grid-no-logo-contact.svg, inlined so the
 * text is real (selectable, readable by screen readers) and the font can be
 * swapped from CSS. Coordinates are the SVG's original 1920×1080 artboard.
 */
export default function HeroOverlay() {
  return (
    <svg
      className="overlay"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="XPLAN. Hello! We're doing what we do best. Planning and Constructing. While we build something exciting here, feel free to reach out to us."
    >
      <g className="ov-line" fill="none" strokeMiterlimit={10}>
        <line x1="291.29" x2="291.29" y2="1080" />
        <line x1="1628.71" x2="1628.71" y2="1080" />
        <line y1="437.76" x2="1920" y2="437.76" />
        <path d="M988.97,1080v-241.32c0-15.25,5.37-30.02,15.24-41.64,14.66-17.25,33.55-45.25,25.89-68.1-12-35.79-68.22-54.64-70.11-135.2-1.88-80.56,0-593.74,0-593.74" />
      </g>
      <g className="ov-text" aria-hidden="true">
        <text className="ov-hello" transform="translate(325.42 394.93)">
          <tspan x="0" y="0">Hello!</tspan>
        </text>
        <text className="ov-tagline" transform="translate(335.66 766.48)">
          <tspan x="0" y="0">We&apos;re doing what we do best.</tspan>
          <tspan x="0" y="61.71">Planning &amp; Constructing.</tspan>
        </text>
        <text className="ov-note" transform="translate(1145.9421 935.5396)">
          <tspan x="0" y="0">While we build something exciting here,</tspan>
          <tspan x="146.84" y="29.62">feel free to reach out to us.</tspan>
        </text>
      </g>
    </svg>
  );
}
