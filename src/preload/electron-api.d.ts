import { ElectronAPI } from '@electron-toolkit/preload';

import type { AppInfo } from '@globalTypes/appInfoTypes';
import { api, appInfo } from './index';

declare global {
   interface Window {
      electron: ElectronAPI;
      api: typeof api;
      appInfo: typeof appInfo;
   }
}
