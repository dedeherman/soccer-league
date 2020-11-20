var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BPJUN7IX4DOMkCf9Notasz8SmwNYj79jy5qwa5i9uPlwBWySKd29aYC5Leaf2WpXmgQxX0tla-_pkk9j0n1feRU",
    "privateKey": "XKBI0opGuB5zp4xUIEVux9IcZZLQytZRsTzGKG5qix4"
};


webPush.setVapidDetails(
    'mailto:dedehermanvpay@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cW_5N3t0Rr0:APA91bHi1aiifHzO3pLfzPb0rCkYnrObPjMHfKVUOu-bh1OiuPOdrrXFqUH1RKu5RTwqSnGB2vfXhyWsGxeXciBd8bR258a2tpV_9JXswg7UZAHbmdYiTjK1AhdqHn74DTbniGCXikgx",
    "keys": {
        "p256dh": "BCKx9t84elex2TA7n1h3GVrvQowAtf4K5F0tQpV/mU1sqzLiMkxizrw/vZPmkRdRTt8FbpIUOEj+9ARnn6PpKuc=",
        "auth": "Okx5JSdjtDlFj/kgjLFiMQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '419316573694',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
).then(success => {
    console.log(success)
}).catch(error => {
    console.log(error)
})