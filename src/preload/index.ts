import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import { Path, ImportBehaviour } from '../types/fileTypes';
import type { UUID } from '../types/stringTypes';
import { saveDataAPI } from '../api/saveData';
import { songsAPI } from '../api/songs';

const {
   getSongs,
   importSongs,
   loadCoverArt,
} = songsAPI;

const { saveData, loadData, deleteData } = saveDataAPI;

// Custom APIs for renderer
export const api = {
   getSongs: () => ipcRenderer.invoke(getSongs.name),
   importSongs: (importBehaviour: ImportBehaviour) => ipcRenderer.invoke(importSongs.name, importBehaviour),
   loadCoverArt: (songPath: Path) => ipcRenderer.invoke(loadCoverArt.name, songPath),
   saveData: (storageKey: UUID, data: string) => ipcRenderer.invoke(saveData.name, [storageKey, data]),
   loadData: (storageKey: UUID) => ipcRenderer.invoke(loadData.name, storageKey),
   deleteData: (storageKey: UUID) => ipcRenderer.invoke(deleteData.name, storageKey),
};

export const appInfo = {
   getAppInfo: () => ipcRenderer.invoke('getAppInfo'),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
   try {
      contextBridge.exposeInMainWorld('electron', electronAPI);
      contextBridge.exposeInMainWorld('api', api);

      contextBridge.exposeInMainWorld('appInfo', appInfo);
   } catch (error) {
      console.error(error);
   }
} else {
   // @ts-ignore (define in dts)
   window.electron = electronAPI;
   // @ts-ignore (define in dts)
   window.api = api;

   window.appInfo = appInfo;
}
