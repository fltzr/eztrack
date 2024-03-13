import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../../../node_modules/.vite/libs/web/web-shared-utils',

  plugins: [
    nxViteTsPaths(),
    visualizer({
      filename: '../../../../visualizer/sourcemap-shared-web-types.html',
      title: 'sourcemap-shared-web-types',
    }),
  ],

  test: {
    globals: true,
    cache: { dir: '../../../../node_modules/.vitest' },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../../coverage/libs/web/web-shared-utils',
      provider: 'v8',
    },
  },
});
