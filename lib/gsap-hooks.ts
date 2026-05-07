"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook: fade + slide an element into view on scroll.
 * Returns a ref to attach to the container.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    stagger?: number;
    childSelector?: string;
    once?: boolean;
    start?: string;
  } = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 50,
    opacity = 0,
    duration = 0.9,
    delay = 0,
    ease = "power3.out",
    stagger = 0,
    childSelector,
    once = true,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targets: gsap.TweenTarget = el;
    if (childSelector) {
      targets = el.querySelectorAll(childSelector);
    }

    gsap.set(targets, { y, opacity, willChange: "transform, opacity" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease,
          stagger: stagger || 0,
          clearProps: "willChange",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [y, opacity, duration, delay, ease, stagger, childSelector, once, start]);


  return ref;
}

/**
 * Hook: GSAP-powered magnetic button effect on hover.
 */
export function useMagneticEffect<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.4
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * Hook: split text into spans, then animate each character in on scroll.
 */
export function useTextSplitReveal<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const text = el.textContent || "";
    const words = text.split(" ");

    el.innerHTML = words
      .map(
        (word) =>
          `<span class="word-wrapper" style="display:inline-block;overflow:hidden;"><span class="word" style="display:inline-block;">${word}</span></span>`
      )
      .join(" ");

    const wordEls = el.querySelectorAll(".word");

    gsap.set(wordEls, { y: "110%", opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(wordEls, {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
        });
      },
    });

    return () => {
      trigger.kill();
      // Restore text
      el.textContent = text;
    };
  }, []);

  return ref;
}

/**
 * Hook: counter animation (number count-up on scroll).
 */
export function useCountUp(
  end: number,
  options: { duration?: number; prefix?: string; suffix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const { duration = 2, prefix = "", suffix = "" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { value: 0 };
    el.textContent = `${prefix}0${suffix}`;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [end, duration, prefix, suffix]);


  return ref;
}
