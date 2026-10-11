import { ParallaxBackdrop } from "@/components/parallax/parallax-backdrop";

/** Skeleton of the coming-soon hero, so the page doesn't jump when it lands. */
export default function ParallaxLoading() {
  return (
    <div role="status" aria-busy="true" aria-live="polite" className="pxl-root -mt-20 overflow-hidden">
      <span className="sr-only">Loading Parallax…</span>
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 pt-32 pb-28">
        <ParallaxBackdrop />
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center">
          <div className="pxl-skeleton h-8 w-36 rounded-full mb-10" />
          <div className="pxl-skeleton h-[clamp(46px,7vw,92px)] w-[clamp(220px,34vw,440px)] mb-8" />
          <div className="pxl-skeleton h-7 w-[min(560px,90%)] mb-6" />
          <div className="pxl-skeleton h-4 w-[min(520px,85%)] mb-2" />
          <div className="pxl-skeleton h-4 w-[min(420px,70%)] mb-12" />
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-2xl mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pxl-glass pxl-count-tile">
                <div className="pxl-skeleton h-[clamp(30px,5.2vw,64px)] w-[70%]" />
                <div className="pxl-skeleton h-2.5 w-12" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[120, 150, 140, 170].map((w) => (
              <div key={w} className="pxl-skeleton h-7 rounded-full" style={{ width: w }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
