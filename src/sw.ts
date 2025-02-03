import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
// import { NetworkFirst } from 'workbox-strategies'
// import { registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

self.skipWaiting()

// registerRoute(
// 	({ request }) => request.destination === 'document',
// 	new NetworkFirst()
// );
