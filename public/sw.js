if(!self.define){
  let e,t={};
  const i=(i,n)=>(i=new URL(i+".js",n).href,t[i]||new Promise(
    (t=>{if("document"in self){const e=document.createElement("script");
      e.src=i,e.onload=t,document.head.appendChild(e)}else e=i,importScripts(i),t()}))
      .then((()=>{let e=t[i];if(!e)
        throw new Error(`Module ${i} didn’t register its module`);
        return e})));
        self.define=(n,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;
          if(t[r])return;
          let s={};
          const c=e=>i(e,r),f={module:{uri:r},exports:s,require:c};t[r]=Promise.all(n.map((e=>f[e]||c(e)))).then((e=>(o(...e),s)))}}
          define(["./workbox-1c674fbd"],(function(e){"use strict";
            self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"icon.png",revision:"79a667ea504982c7dd08d503b1b76136"},{url:"manifest.json",revision:"ffd595e6ec249f9f71091663c3e72b5c"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
