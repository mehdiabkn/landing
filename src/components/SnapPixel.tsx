'use client';

import Script from 'next/script';

export default function SnapPixel() {
  return (
    <>
      <Script
        id="snapchat-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(e,t,n){
              if(e.snaptr) return;
              var a = e.snaptr = function(){
                a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments);
              };
              a.queue = [];
              var s = 'script';
              var r = t.createElement(s);
              r.async = true;
              r.src = n;
              var u = t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r, u);
            })(window, document, 'https://sc-static.net/scevent.min.js');

            snaptr('init', '60c76ab3-21cd-4483-9b0d-6e73a38b4d50');
            snaptr('track', 'PAGE_VIEW');
          `,
        }}
      />
    </>
  );
}
