// Service Worker for SavvY BI Dashboard
const CACHE_NAME = 'savvy-bi-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/sales-2025.html',
  '/hr-dashboard.html',
  '/tong-hop-2025-2026.html',
  '/manifest.json',
  '/offline.html',
  'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.css'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS_TO_CACHE)
          .catch((err) => {
            console.warn('Some assets failed to cache:', err);
            // Cache what we can - continue even if some assets fail
            const cacheableAssets = [
              '/',
              '/index.html',
              '/sales-2025.html',
              '/hr-dashboard.html',
              '/tong-hop-2025-2026.html',
              '/manifest.json',
              '/offline.html'
            ];
            return cache.addAll(cacheableAssets);
          });
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service Worker activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - cache first, network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    // For CDN requests, try network first, then cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response && response.status === 200) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // Fall back to cache for CDN resources
          return caches.match(request)
            .catch(() => {
              // No cache available
              return new Response('Offline - resource not available', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
    return;
  }

  // For local requests: cache first, network fallback
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response && response.status === 200) {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, clonedResponse);
              });
            }
            return response;
          })
          .catch(() => {
            // Network request failed - return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/offline.html')
                .then((response) => response || new Response('Offline'));
            }

            // For non-navigation requests, return a generic offline response
            return new Response('Offline - resource not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
