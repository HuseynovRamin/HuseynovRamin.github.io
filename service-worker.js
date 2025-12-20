// ============================================
// HYDROTRACK PRO - SERVICE WORKER
// Version: 2.5.0
// Auto-update enabled
// ============================================

const APP_VERSION = '2.5.0';
const CACHE_NAME = `hydrotrack-cache-v${APP_VERSION}`;

// Files to cache
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Install event - cache assets
self.addEventListener('install', event => {
  console.log(`[Service Worker] Installing HydroTrack v${APP_VERSION}`);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log(`[Service Worker] Activating HydroTrack v${APP_VERSION}`);
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches from previous versions
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      // Claim all clients (tabs) immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - network first for HTML, cache first for others
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip Chrome extensions
  if (url.protocol === 'chrome-extension:') return;
  
  // For HTML requests: network first, then cache
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the updated version
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          // If network fails, serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For other resources: cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version
        if (response) {
          // Check if this is a cache request for the main page
          if (event.request.url.includes('index.html')) {
            // Always check for updates for the main page
            return fetch(event.request)
              .then(networkResponse => {
                const networkResponseClone = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, networkResponseClone));
                return networkResponse;
              })
              .catch(() => response); // Fall back to cache if network fails
          }
          return response;
        }
        
        // Fetch from network and cache
        return fetch(event.request).then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        });
      })
  );
});

// Message event - for skipping waiting
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skipping waiting');
    self.skipWaiting();
  }
});

// Background sync (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
      console.log('[Service Worker] Background sync triggered');
    }
  });
}

// Periodic sync (if supported)
if ('periodicSync' in self.registration) {
  self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-check') {
      console.log('[Service Worker] Periodic update check');
      // Could fetch updates here
    }
  });
}
