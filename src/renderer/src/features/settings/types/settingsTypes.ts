import type { FontSizeInPx } from 'types/cssTypes';

export interface GeneralSettingsState {
   fontSize: FontSizeInPx;
}

export interface SettingsState {
   generalSettings: GeneralSettingsState;
}
