import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching'
import { CacheFirst, NetworkFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute, Route } from 'workbox-routing'
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import { clientsClaim, RouteHandlerCallbackOptions } from 'workbox-core'

cleanupOutdatedCaches()

declare let self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

clientsClaim()
self.skipWaiting()

const imageRoute = new Route(
	({ request, sameOrigin }) => {
		return sameOrigin && request.destination === 'image'
	},
	new CacheFirst({
		cacheName: 'images',
	}),
)
registerRoute(imageRoute)

// Cache fonts using CacheFirst
registerRoute(
	({ request, sameOrigin }) => {
		return sameOrigin && request.destination === 'font'
	},
	new StaleWhileRevalidate({
		cacheName: 'fonts',
	}),
)

// // Cache static assets (CSS, JS)
// registerRoute(
// 	({ request }) => ['script', 'style'].includes(request.destination),
// 	new StaleWhileRevalidate({ cacheName: 'static-resources' })
// )

// Cache API responses using NetworkFirst
const apiRoutes = ['/api/v1/user', '/api/v1/user/', '/api/v1/chat', '/api/v1/message/']
registerRoute(
	({ url }) => apiRoutes.some((path) => url.pathname.includes(path)),
	new NetworkFirst({ cacheName: 'api' }),
)

//  background sync
const bgSyncPlugin = new BackgroundSyncPlugin('backgroundSyncQueue', {
	maxRetentionTime: 24 * 60,
})

registerRoute(
	new Route(
		({ request }) => {
			return request.url.includes('/api/v1/message/send/')
		},
		new NetworkOnly({
			plugins: [bgSyncPlugin],
		}),
		'POST',
	),
)

registerRoute(({ request }) => request.mode === 'navigate' && request.method === 'GET', navigateFallback, 'GET')

async function navigateFallback(args: RouteHandlerCallbackOptions) {
	const defaultFallbackUrl = '/index.html'
	let fetchedResponse: Response | undefined

	try {
		console.debug(`Attempting to fetch ${args.request.url}.`)
		fetchedResponse = await fetch(args.request.url)
	} catch (error) {
		console.warn(`Fetch Error: ${error}`)
	}

	if (!fetchedResponse?.ok) {
		console.debug(`Failed to fetch ${args.request.url}. Serving ${defaultFallbackUrl} from cache.`)
		fetchedResponse = await matchPrecache(defaultFallbackUrl)
	}

	return fetchedResponse || Response.error()
}

// Cache React navigation (SPA routes)
// registerRoute(
// 	new NavigationRoute(
// 		new NetworkFirst({
// 			cacheName: 'navigation',
// 			networkTimeoutSeconds: 3,
// 		})
// 	)
// )
