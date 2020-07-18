//Register Service Worker
if ("serviceWorker" in navigator) {
  registerServiceWorker();
  requestPermission();
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

function registerServiceWorker() {
  return navigator.serviceWorker
    .register("./../service-worker.js")
    .then((registration) => {
      console.log(
        "ServiceWorker: Pendaftaran berhasil. Scope:",
        registration.scope
      );
    })
    .catch((error) => {
      console.error("ServiceWorker: Pendaftaran gagal. Error:", error);
    });
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    console.log("Fitur notifikasi diijinkan.");
    if ("PushManager" in window) {
      navigator.serviceWorker.getRegistration().then(function (registration) {
        registration.pushManager
          .subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              "BIV28CYBVrbBH80YwskiJoxzq5JQr1G2xzaFw5vmwKW-3jixbnRRFbqfN6r13XlQssHbqzSqyIybF5nqlo_LtlQ"
            ),
          })
          .then(function (subscribe) {
            console.log(
              "Berhasil melakukan subscribe dengan endpoint: ",
              subscribe.endpoint
            );
            console.log(
              "Berhasil melakukan subscribe dengan p256dh key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("p256dh"))
                )
              )
            );
            console.log(
              "Berhasil melakukan subscribe dengan auth key: ",
              btoa(
                String.fromCharCode.apply(
                  null,
                  new Uint8Array(subscribe.getKey("auth"))
                )
              )
            );
          })
          .catch(function (e) {
            console.error("Tidak dapat melakukan subscribe ", e.message);
          });
      });
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
