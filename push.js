var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BIV28CYBVrbBH80YwskiJoxzq5JQr1G2xzaFw5vmwKW-3jixbnRRFbqfN6r13XlQssHbqzSqyIybF5nqlo_LtlQ",
  privateKey: "TUJtMzjDrjECpm_JyqPzjctFFmePpH5-Q4DWA9R8Seg",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/ekJcBJOXZIM:APA91bEEftYg7SEO1_E2ukrG_Qy-i6K0a8G5-yGID3oKIMFmfFy9--VUFm0_2861UyFFXo2cEmLJ92-M0ZQfDujol14zPbhkjJ3fxDNX2956hoQJPvtnuSGptCKakYoul8wYq2T3m94Z",
  keys: {
    p256dh:
      "BLOoe+5k6ZCj8zlJ70K2gVanX1b/ktRfBbasUdT2Jw/sT2DNbH7/7YY3Hu+ldKhRS8SHzcCurEIt5URu644I/+k=",
    auth: "jSUHn6WQoDIzmcjQE2//vw==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "47455948800",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
