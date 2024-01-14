export interface GeneralSettingsState {
}

export type SettingsStateSlice = keyof SettingsState;
export type SettingsStateValue = SettingsState[keyof SettingsState];

export interface SettingsState {
   generalSettings: GeneralSettingsState;
}

export interface SettingsContext {
   getCurrentSettings: () => SettingsState;
   changeSetting: (slice: SettingsStateSlice, value: SettingsStateValue) => void;
   getChangedSettings: () => SettingsState;
   revertChangedSettings: () => void;
   saveAppliedSettings: () => void;
}
