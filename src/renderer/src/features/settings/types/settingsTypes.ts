export interface GeneralSettingsState {
}

export enum Theme {
   light = 'light',
   dark = 'dark',
}

export interface StyleSettingsState {
   theme: Theme,
}

export type SettingsStateSlice = keyof SettingsState;
export type SettingsStateValue = SettingsState[keyof SettingsState];

export interface SettingsState {
   generalSettings: GeneralSettingsState;
   styleSettings: StyleSettingsState
}

export interface SettingsContext {
   getCurrentSettings: () => SettingsState;
   changeSetting: (slice: SettingsStateSlice, value: SettingsStateValue) => void;
   getChangedSettings: () => SettingsState;
   revertChangedSettings: () => void;
   saveAppliedSettings: () => void;
}
