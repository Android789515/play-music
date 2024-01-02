import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

import type { Path } from '../types/fileTypes';
import { songsAPI } from '../api/songs';

const { getSongs, loadCoverArt } = songsAPI;

// Custom APIs for renderer
export const api = {
   getSongs: () => ipcRenderer.invoke(getSongs.name),
   loadCoverArt: (songPath: Path) => ipcRenderer.invoke(loadCoverArt.name, songPath),
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
   try {
      contextBridge.exposeInMainWorld('electron', electronAPI);
      contextBridge.exposeInMainWorld('api', api);
   } catch (error) {
      console.error(error);
   }
} else {
   // @ts-ignore (define in dts)
   window.electron = electronAPI;
   // @ts-ignore (define in dts)
   window.api = api;
}
