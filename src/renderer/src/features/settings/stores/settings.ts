import { atom } from 'recoil';

import type { SettingsState } from '../types';

const keys = {
   settings: 'settings',
   generalSettings: 'generalSettings',
};

export const settingsState = atom<SettingsState>({
   key: keys.settings,
   default: {
      generalSettings: {
         fontSize: '16px',
      },
   },
});
