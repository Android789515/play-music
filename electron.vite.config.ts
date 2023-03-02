import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   main: {
      plugins: [ externalizeDepsPlugin() ],
   },
   preload: {
      plugins: [ externalizeDepsPlugin() ],
   },
   renderer: {
      resolve: {
         alias: {
            'renderer': resolve('src/renderer/src'),
            'namespace': resolve('src/renderer/src/namespace.ts'),
            'components': resolve('src/renderer/src/components'),
            'features': resolve('src/renderer/src/features'),
            '@utils': resolve('src/utils'),
            '@globalTypes': resolve('src/types'),
            '@api': resolve('src/api'),
            'types': resolve('src/renderer/src/types'),
            'hooks': resolve('src/renderer/src/hooks'),
         },
      },
      plugins: [ react() ],
   },
});
