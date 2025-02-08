import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		VitePWA({
			devOptions: {
				enabled: false,
				type: 'module',
			},
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.ts',
			registerType: 'autoUpdate',
			injectManifest: {
				swSrc: 'dist/sw.js',
			},
			includeAssets: ['fonts/*.woff', 'fonts/*.woff2', 'images/*.png', 'images/*.jpg'],
			manifest: {
				name: 'Super Chat App',
				short_name: 'Super Chat',
				icons: [
					{
						src: 'manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'manifest-icon-192.maskable.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable',
					},
					{
						src: 'manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any',
					},
					{
						src: 'manifest-icon-512.maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
				theme_color: '#fff',
				background_color: '#fff',
				start_url: '/',
				display: 'standalone',
			},
		}),
	],
	build: {
		sourcemap: true,
	},
	server: {
		port: 3000,
		strictPort: true,
		host: true,
		origin: 'http://0.0.0.0:3000',
	},
})
