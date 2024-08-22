import { join } from 'path';

import { app, shell, BrowserWindow, ipcMain, protocol } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';

import type { AppInfo, VersionInfo } from '../types/appInfoTypes';
import { songsAPI } from '../api/songs';
import { saveDataAPI } from '../api/saveData';
import { mediaProtocol } from './mediaProtocol';

import icon from '../../resources/icon-dark.png?asset';

function createWindow(): void {
   // Create the browser window.
   const mainWindow = new BrowserWindow({
      width: 900,
      height: 670,
      minWidth: 320,
      minHeight: 500,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
         preload: join(__dirname, '../preload/index.cjs'),
         sandbox: false,
      },
   });

   const {
      getSongs,
      importSongs,
      loadCoverArt,
   } = songsAPI;

   ipcMain.handle(getSongs.name, getSongs.fn);

   ipcMain.handle(importSongs.name, (_, importBehaviour) => importSongs.fn(importBehaviour));

   ipcMain.handle(loadCoverArt.name, (_, songPath) => {
      return loadCoverArt.fn(songPath);
   });

   const { saveData, loadData, deleteData } = saveDataAPI;

   ipcMain.handle(saveData.name, (_, [ storageKey, data ]) => saveData.fn(storageKey, data));
   ipcMain.handle(loadData.name, (_, storageKey) => loadData.fn(storageKey));
   ipcMain.handle(deleteData.name, (_, storageKey) => {
      deleteData.fn(storageKey);

      mainWindow.reload();
   });

   ipcMain.handle('reload', () => {
      mainWindow.reload();
   });

   ipcMain.handle('getAppInfo', () => {
      const versionsToFetch = [
         'node',
         'chrome',
         'electron',
      ];

      const versions = Object.keys(process.versions)
         .filter(key => versionsToFetch.includes(key))
         .toSorted()
         .map(versionName => {
            return {
               name: versionName,
               version: process.versions[versionName],
            } as VersionInfo;
         });

      return {
         versions: [
            {
               name: 'app',
               version: app.getVersion(),
            },
            ...versions,
         ],
      } as AppInfo;
   });

   mainWindow.on('ready-to-show', () => {
      mainWindow.show();
   });

   mainWindow.webContents.setWindowOpenHandler(details => {
      shell.openExternal(details.url);
      return { action: 'deny' };
   });

   // HMR for renderer base on electron-vite cli.
   // Load the remote URL for development or the local html file for production.
   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
   } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
   }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   // Set app user model id for windows
   electronApp.setAppUserModelId('com.electron');

   // Default open or close DevTools by F12 in development
   // and ignore CommandOrControl + R in production.
   // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
   app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
   });

   createWindow();

   app.on('activate', function () {
      // On macOS, it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
   });

   // Media protocol
   protocol.registerFileProtocol('media', mediaProtocol);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
