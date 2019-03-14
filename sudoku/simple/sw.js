self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/sudoku/simple/',
                '/sudoku/simple/main.css',
                '/sudoku/simple/main.js',
            ]);
        })
    );
});