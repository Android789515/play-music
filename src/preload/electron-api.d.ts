import { ElectronAPI } from '@electron-toolkit/preload';

import type { AppInfo } from '@globalTypes/appInfoTypes';
import { api } from './index';

declare global {
   interface Window {
      electron: ElectronAPI;
      api: typeof api;
      appInfo: AppInfo;
   }
}
