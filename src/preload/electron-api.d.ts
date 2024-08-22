import { ElectronAPI } from '@electron-toolkit/preload';

import type { AppInfo } from '@globalTypes/appInfoTypes';
import { api, reload, appInfo } from './index';

declare global {
   interface Window {
      electron: ElectronAPI;
      api: typeof api;
      reload: typeof reload;
      appInfo: typeof appInfo;
   }
}
