// Periksa service worker
if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
} else {
    registerServiceWorker();
}
// Register service worker
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

// Periksa fitur Notification API
if ("Notification" in window) {
    requestPermission();
} else {
    console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
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
                // Jika service worker sudah ready (navigator.serviceWorker.ready)
                navigator.serviceWorker.ready.then(reg => {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BAhp35Ni4oAL2nqH6qei07lIutCE9WX5u-3fTeLNhYbh9e4hrER6QgGPD8a6a7Pz_61t6hYifaXGptkMQVpRCtg")
                    }).then(sub => {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', sub.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(sub.getKey('auth')))));
                    }).catch(e => {
                        console.error('Tidak dapat melakukan subscribe ', e);
                        // kembalikan agar menjalankan register service worker
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