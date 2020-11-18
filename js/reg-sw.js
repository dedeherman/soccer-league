if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
}

function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('Registrasi service worker berhasil.');
            return registration;
        })
        .catch(function(err) {
            console.error('Registrasi service worker gagal.', err);
        });
}

if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }

            if (('PushManager' in window)) {
                navigator.serviceWorker.ready.then(reg => {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BPJUN7IX4DOMkCf9Notasz8SmwNYj79jy5qwa5i9uPlwBWySKd29aYC5Leaf2WpXmgQxX0tla-_pkk9j0n1feRU")
                    }).then(sub => {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('auth')))));
                    }).catch(e => {
                        console.error('Tidak dapat melakukan subscribe ', e);
                        return registerServiceWorker();
                    });

                });
            }


        });
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}