'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    snaptr?: (...args: any[]) => void;
  }
}

export default function SnapPixel() {
  useEffect(() => {
    // Si le pixel est déjà injecté, ne rien faire

    // Injecte le script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sc-static.net/scevent.min.js';

    script.onload = () => {
      if (!window.snaptr) return;

      window.snaptr('init', '60c76ab3-21cd-4483-9b0d-6e73a38b4d50');
      window.snaptr('track', 'PAGE_VIEW');
    };

    document.head.appendChild(script);
  }, []);

  return null;
}
