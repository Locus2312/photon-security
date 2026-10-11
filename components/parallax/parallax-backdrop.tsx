import "./parallax.css";

/**
 * The Parallax sign-in backdrop: four drifting light blobs (cyan, blue,
 * violet, amber), fluted-glass streaks and film grain over charcoal. Static:
 * the blobs only fade in. Styles live in ./parallax.css.
 */
export function ParallaxBackdrop({ dim = false, className = "" }: { dim?: boolean; className?: string }) {
  return (
    <div className={`pxl-backdrop ${dim ? "pxl-backdrop-dim" : ""} ${className}`} aria-hidden="true">
      <div className="pxl-blobs">
        <div className="pxl-blob pxl-blob-cyan" />
        <div className="pxl-blob pxl-blob-blue" />
        <div className="pxl-blob pxl-blob-violet" />
        <div className="pxl-blob pxl-blob-amber" />
      </div>
      <div className="pxl-streaks" />
      <div className="pxl-grain" />
    </div>
  );
}
