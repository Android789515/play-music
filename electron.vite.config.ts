import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   main: {
      plugins: [ externalizeDepsPlugin() ],
      build: {
         rollupOptions: {
            output: {
               format: 'es',
            },
         },
      },
   },
   preload: {
      plugins: [ externalizeDepsPlugin() ],
      build: {
         rollupOptions: {
            output: {
               format: 'cjs',
            },
         },
      },
   },
   renderer: {
      resolve: {
         alias: {
            '@utils': resolve('src/utils'),
            '@globalTypes': resolve('src/types'),
            '@api': resolve('src/api'),
            'renderer': resolve('src/renderer/src'),
            'types': resolve('src/renderer/src/types'),
            'utils': resolve('src/renderer/src/utils'),
            'components': resolve('src/renderer/src/components'),
            'hooks': resolve('src/renderer/src/hooks'),
            'features': resolve('src/renderer/src/features'),
         },
      },
      plugins: [ react() ],
   },
});
