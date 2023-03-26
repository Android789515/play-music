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
            '@utils': resolve('src/utils'),
            '@globalTypes': resolve('src/types'),
            '@api': resolve('src/api'),
            'renderer': resolve('src/renderer/src'),
            'components': resolve('src/renderer/src/components'),
            'features': resolve('src/renderer/src/features'),
            'types': resolve('src/renderer/src/types'),
            'hooks': resolve('src/renderer/src/hooks'),
            'utils': resolve('src/renderer/src/utils'),
         },
      },
      plugins: [ react() ],
   },
});
