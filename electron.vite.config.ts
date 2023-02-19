import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
   main: {
      plugins: [externalizeDepsPlugin()],
   },
   preload: {
      plugins: [externalizeDepsPlugin()],
   },
   renderer: {
      // Design mode
      // root: 'src/renderer/design',
      resolve: {
         alias: {
            'renderer': resolve('src/renderer/src'),
            'components': resolve('src/renderer/src/components'),
            'features': resolve('src/renderer/src/features'),
            'utils': resolve('src/renderer/src/utils'),
            'types': resolve('src/renderer/src/types'),
            'hooks': resolve('src/renderer/src/hooks'),
         },
      },
      plugins: [react()],
   },
});
