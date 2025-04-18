'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    snaptr?: (...args: unknown[]) => void;
  }
}

export default function SnapPixel() {
  useEffect(() => {
    if (window.snaptr) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://sc-static.net/scevent.min.js';

    script.onload = () => {
      if (!window.snaptr) return;

      window.snaptr('init', '60c76ab3-21cd-4483-9b0d-6e73a38b4d50');
      window.snaptr('track', 'PAGE_VIEW');

      console.log("✅ PAGE_VIEW envoyé à Snapchat mazal tov jewbuzze");
    };

    document.head.appendChild(script);
  }, []);

  return null;
}
