"use client";

import { useEffect, useState } from "react";

export type Remaining = { days: number; hours: number; minutes: number; seconds: number };

export type LaunchClock = {
  /** False until the server's time has been fetched (skeletons show meanwhile). */
  mounted: boolean;
  /** True only once the server has confirmed the launch time has passed. */
  launched: boolean;
  remaining: Remaining | null;
  /** Milliseconds since launch, 0 before it. */
  sinceLaunch: number;
  /** The Parallax app; the server sends it only after launch. */
  appUrl: string | null;
};

type ServerState = { now: number; launched: boolean; appUrl: string | null };

/**
 * In development only, `?at=<ISO date>` on the page URL pretends it is that
 * moment (ticking on from there), e.g.
 * `/parallax?at=2026-10-11T21:00:00%2B05:30`. Ignored in production builds.
 */
function devStart(): { at: number; perf: number } | null {
  if (process.env.NODE_ENV === "production") return null;
  // "+" in a query string decodes to a space, so put it back for the UTC offset.
  const raw = new URLSearchParams(window.location.search).get("at")?.replace(" ", "+");
  const at = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(at) ? null : { at, perf: performance.now() };
}

/**
 * Asks the server for its time and the launch state. The returned `now` is
 * pinned to performance.now(), a monotonic timer the device clock can't move.
 */
// Calls made within a second of each other (remounts, both countdowns on a
// page) share one request.
let pending: { started: number; request: ReturnType<typeof requestServer> } | null = null;

function fetchServer(dev: { at: number; perf: number } | null) {
  if (!pending || performance.now() - pending.started > 1000) {
    pending = { started: performance.now(), request: requestServer(dev) };
  }
  return pending.request;
}

async function requestServer(dev: { at: number; perf: number } | null) {
  const query = dev ? `?at=${encodeURIComponent(new Date(dev.at + (performance.now() - dev.perf)).toISOString())}` : "";
  const sent = performance.now();
  const res = await fetch(`/api/parallax/launch${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`launch state ${res.status}`);
  const data = (await res.json()) as ServerState;
  const received = performance.now();
  // Assume the server stamped its time halfway through the round trip.
  return { ...data, now: data.now + (received - sent) / 2, perf: received };
}

function split(ms: number): Remaining {
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

const INITIAL: LaunchClock = { mounted: false, launched: false, remaining: null, sinceLaunch: 0, appUrl: null };

export function useLaunchClock(launchDate: string): LaunchClock {
  const target = Date.parse(launchDate);
  const [state, setState] = useState<LaunchClock>(INITIAL);

  useEffect(() => {
    let cancelled = false;
    let timer = 0;
    const dev = devStart();
    // Server time at `perf`, and what the server last said about the launch.
    let sync: { now: number; perf: number } | null = null;
    let server: { launched: boolean; appUrl: string | null } = { launched: false, appUrl: null };
    let lastAsk = 0;

    const now = () => (sync ? sync.now + (performance.now() - sync.perf) : Date.now());

    const ask = async () => {
      lastAsk = performance.now();
      try {
        const res = await fetchServer(dev);
        if (cancelled) return;
        sync = { now: res.now, perf: res.perf };
        server = { launched: res.launched, appUrl: res.appUrl };
      } catch {
        // Keep counting on the last known time; the next check retries.
      }
    };

    const tick = () => {
      // No server time yet (request failed): keep the skeletons and retry every 5s.
      if (!sync) {
        if (performance.now() - lastAsk > 5000) void ask().then(tick);
        return;
      }
      const diff = target - now();
      // At zero, the live view waits for the server to confirm (checking every 5s).
      if (diff <= 0 && !server.launched && performance.now() - lastAsk > 5000) void ask().then(tick);
      setState(
        server.launched
          ? { mounted: true, launched: true, remaining: null, sinceLaunch: Math.max(0, -diff), appUrl: server.appUrl }
          : { mounted: true, launched: false, remaining: split(Math.max(0, diff)), sinceLaunch: 0, appUrl: null },
      );
    };

    void ask().then(() => {
      if (cancelled) return;
      tick();
      timer = window.setInterval(tick, 1000);
    });

    // Re-sync when the tab comes back, in case the device slept for a while.
    const onVisible = () => {
      if (document.visibilityState === "visible") void ask().then(tick);
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [target]);

  return state;
}
