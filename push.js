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
    "endpoint": "https://fcm.googleapis.com/fcm/send/egswGvkY0Oc:APA91bGo5keQGCdRaW00TWHrI4-2FzAuAZPE0ucpto2eqbGKAAVptvLXDg8AyO2Yhj0_G4J2cOtvGJdmVX1miyWokn0UpfRe-2x1SRyOweUWaUv2fmk9K8jMZh93XTksjDu1XeYBF1mS",
    "keys": {
        "p256dh": "BEVYN/fPRkymiUZHDNNo1sasUEbe6A1XpNxQgEw599KxPxzA5v/rAj1COQ1dSmY5cFSjbCZ/38DShNayS2O7cDU=",
        "auth": "HjuBmEWcH48J+UHqwnQs7Q=="
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