'use client'

import { useState, useRef, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@phosphor-icons/react'
import gsap from 'gsap'

export function BlogThemeWrapper({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(false)
  const [hidden, setHidden] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (!buttonRef.current) return;

    if (document.startViewTransition) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const x = btnRect.left + btnRect.width / 2;
      const y = btnRect.top + btnRect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        setIsLight(!isLight);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(${maxRadius}px at ${x}px ${y}px)`,
              `circle(0px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 800,
            easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
            pseudoElement: '::view-transition-old(root)'
          }
        );
      });
    } else {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.backgroundColor = isLight ? '#050505' : '#ffffff';
      overlay.style.zIndex = '9999';
      overlay.style.pointerEvents = 'none';
      document.body.appendChild(overlay);

      setIsLight(!isLight);

      const btnRect = buttonRef.current.getBoundingClientRect();
      const x = btnRect.left + btnRect.width / 2;
      const y = btnRect.top + btnRect.height / 2;

      gsap.fromTo(overlay,
        { clipPath: `circle(150% at ${x}px ${y}px)` },
        {
          clipPath: `circle(0% at ${x}px ${y}px)`,
          duration: 1,
          ease: "power3.inOut",
          onComplete: () => overlay.remove()
        }
      );
    }
  };

  return (
    <div 
      data-theme={isLight ? 'light' : 'dark'}
      className={`relative min-h-screen -mt-20 pt-20 transition-colors duration-0 ${isLight ? 'blog-light bg-background text-foreground' : 'bg-background text-foreground'}`}
    >
      {/* Floating Theme Toggle */}
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={`fixed bottom-6 left-6 md:bottom-auto md:left-auto md:top-28 md:right-8 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300 ease-in-out ${hidden ? 'translate-y-32 md:-translate-y-32 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 hover:scale-105 active:scale-95'}`}
        title="Toggle Reading Theme"
      >
        <div className="relative w-6 h-6 overflow-hidden">
           <div className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${isLight ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
             <MoonIcon size={24} weight="duotone" />
           </div>
           <div className={`absolute inset-0 flex items-center justify-center transform transition-transform duration-500 ${!isLight ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
             <SunIcon size={24} weight="duotone" />
           </div>
        </div>
      </button>

      {children}
    </div>
  )
}
