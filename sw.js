// Service Worker - enabling Web App Features :D !


self.addEventListener('install', (event) => {
  // WHEN A NEW VERSION ARRIVES,
  // DELETE THE OLD CACHE
  // TO GET THE LATEST VERSION.
  caches.delete('cache')
});

self.addEventListener('activate', (event) => {
  // Hmm....
})

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        } else {
          return fetch(event.request).then((res) => {
            caches.open('cache').then((cache) => cache.put(event.request, res.clone()));
            return res;
          })
        }
      })
  )
});
