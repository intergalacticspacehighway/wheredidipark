importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);
console.log("service worker registered!");

workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/"),
  new workbox.strategies.NetworkFirst()
);
