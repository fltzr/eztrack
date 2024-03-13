/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig(({ mode }) => {
  console.log(`Building Web App in ${mode} mode.`);

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/web',

    server: {
      strictPort: true,
      host: '0.0.0.0',
      port: 4000,
      proxy: {
        '/api': {
          target: 'http://192.168.1.155:3000',
          changeOrigin: true,
        },
      },
      open: false,
    },

    preview: {
      port: 4000,
      open: false,
    },

    plugins: [react(), nxViteTsPaths()],

    build: {
      outDir: '../../dist/apps/web',
      sourcemap: true,
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 500,
          entryFileNames: 'assets/public/[name].[hash].js',
          chunkFileNames: 'assets/chunks/[name].[hash].js',
          assetFileNames: 'assets/vendor/[name].[hash].[ext]',
        },
      },
    },

    test: {
      globals: true,
      cache: {
        dir: '../../node_modules/.vitest',
      },
      environment: 'jsdom',
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/web',
        provider: 'v8',
      },
    },
  };
});
