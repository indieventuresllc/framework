import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import { cloudflareDevProxyVitePlugin } from '@react-router/dev';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getLoadContext } from './load-context';

export default defineConfig({
	plugins: [
		cloudflareDevProxyVitePlugin({
			getLoadContext,
		}),
		reactRouter({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
			},
		}),
		tsconfigPaths(),
	],
	ssr: {
		resolve: {
			conditions: ['workerd', 'worker', 'browser'],
		},
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'],
	},
	build: {
		minify: true,
	},
});
