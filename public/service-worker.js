//Register workbox
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
  [
    { url: "/manifest.json", revision: "1" },
    { url: "/index.html", revision: "1" },
    { url: "/detail.html", revision: "1" },
    { url: "/src/js/main.js", revision: "1" },
    { url: "/src/js/materialize.min.js", revision: "1" },
    { url: "/src/js/idb.js", revision: "1" },
    { url: "/src/js/db.js", revision: "1" },
    { url: "/src/js/register.js", revision: "1" },
    { url: "/src/loader/loader.js", revision: "1" },
    { url: "/src/loader/loadleague.js", revision: "1" },
    { url: "/src/loader/navloader.js", revision: "1" },
    { url: "/src/loader/pageloader.js", revision: "1" },
    { url: "/src/component/header-bar.js", revision: "1" },
    { url: "/src/component/footer-bar.js", revision: "1" },
    { url: "/src/component/preloader.js", revision: "1" },
    { url: "/src/pages/nav.html", revision: "1" },
    { url: "/src/pages/matches.html", revision: "1" },
    { url: "/src/pages/scorers.html", revision: "1" },
    { url: "/src/pages/home.html", revision: "1" },
    { url: "/src/pages/saved.html", revision: "1" },
    { url: "/src/pages/clubs.html", revision: "1" },
    { url: "/src/image/stadium.jpg", revision: "1" },
    { url: "/src/image/icons/icon.ico", revision: "1" },
    { url: "/src/image/icons/apple-touch-icon.png", revision: "1" },
    { url: "/src/image/icons/icon.png", revision: "1" },
    { url: "/src/image/icons/icon-16x16.png", revision: "1" },
    { url: "/src/image/icons/icon-32x32.png", revision: "1" },
    { url: "/src/image/icons/icon-192x192.png", revision: "1" },
    { url: "/src/image/icons/icon-512x512.png", revision: "1" },
    { url: "/src/styles/materialize.min.css", revision: "1" },
    { url: "/src/styles/style.css", revision: "1" },
  ],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp("/src/pages/"),
  workbox.strategies.cacheFirst({
    cacheName: "pages",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/upload\.wikimedia\.org/,
  workbox.strategies.cacheFirst({
    cacheName: "club-logo",
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.networkFirst({
    cacheName: "api-data",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "src/image/icons/icon.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
