"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useLaunchClock } from "./use-launch-clock";
import { firePartyPoppers } from "./party-poppers";

const UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

function launchLabel(launchDate: string) {
  const d = new Date(launchDate);
  const date = d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const time = d
    .toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" })
    .toLowerCase();
  return `${date}, ${time} IST`;
}

function liveFor(ms: number) {
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return d > 0 ? `${d}d ${pad(h)}h ${pad(m)}m` : `${pad(h)}h ${pad(m)}m ${pad(s % 60)}s`;
}

/**
 * Days / hours / minutes / seconds to launch. Renders skeleton tiles until it
 * mounts (the server cannot know the visitor's clock), then each digit rolls
 * in when it changes. From launch on it shows a "live" panel, and with
 * `celebrate` it fires party poppers: when the countdown reaches zero on
 * screen, and when someone arrives after launch.
 */
export function LaunchCountdown({ launchDate, celebrate = false }: { launchDate: string; celebrate?: boolean }) {
  const { mounted, launched, remaining, sinceLaunch, appUrl } = useLaunchClock(launchDate);
  const fired = useRef(false);

  useEffect(() => {
    if (!celebrate || !launched || fired.current) return;
    fired.current = true;
    const stop = firePartyPoppers();
    return () => {
      stop?.();
      fired.current = false;
    };
  }, [celebrate, launched]);

  if (mounted && launched) {
    return (
      <div className="pxl-glass pxl-live rounded-[22px] px-6 py-7 sm:px-10 sm:py-9 text-center">
        <p className="pxl-live-title">
          Parallax is <span className="pxl-gradient-text">live.</span>
        </p>
        <p className="mt-3 text-[15px] text-white/65">
          Your exposure, finally in view. Write to{" "}
          <a href="mailto:info@photonsecurity.in" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            info@photonsecurity.in
          </a>{" "}
          to get your organisation on board.
        </p>
        {appUrl && (
          <a
            href={appUrl}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Open Parallax
            <ArrowUpRightIcon size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        )}
        <p className="mt-6 font-mono text-[11px] tracking-[0.2em] uppercase text-white/45">
          Launched {launchLabel(launchDate)} · Live for <span className="tabular-nums">{liveFor(sinceLaunch)}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div role="timer" aria-live="off" aria-label={`Launching ${launchLabel(launchDate)}`} className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {UNITS.map((unit) => {
          const value = remaining ? String(remaining[unit.key]).padStart(2, "0") : null;
          return (
            <div key={unit.key} className="pxl-glass pxl-count-tile">
              {value ? (
                <span className="pxl-count-value" aria-hidden="true">
                  {value.split("").map((digit, d) => (
                    <span key={d} className="pxl-digit-mask">
                      <span key={digit} className="pxl-digit">{digit}</span>
                    </span>
                  ))}
                </span>
              ) : (
                <span className="pxl-skeleton block h-[clamp(30px,5.2vw,64px)] w-[70%]" aria-hidden="true" />
              )}
              <span className="pxl-count-label">{unit.label}</span>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] tracking-[0.2em] uppercase text-white/55">
        Launching {launchLabel(launchDate)}
      </p>
    </div>
  );
}
