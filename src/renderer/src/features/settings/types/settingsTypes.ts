export type SettingsStateSlice = keyof SettingsState;
export type SettingsStateValue = SettingsState[keyof SettingsState];

export enum SettingType {
   toggle,
}

export interface Setting<ValueType> {
   type: SettingType;
   options: ValueType[];
   defaultValue: ValueType;
   value: ValueType;
}

export interface GeneralSettingsState {
}

export enum ColorScheme {
   light = 'light',
   dark = 'dark',
}

export interface StyleSettingsState {
   colorScheme: Setting<ColorScheme>,
}

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
