import { ImportBehaviour } from '@globalTypes/fileTypes';

export type SettingsStateSlice = keyof SettingsState;
export type SettingsStateValue = SettingsState[keyof SettingsState];

export enum SettingType {
   toggle,
   dropDownSelect,
   button,
}

export interface Setting<ValueType> {
   type: SettingType;
   options: ValueType[];
   defaultValue: ValueType;
   value: ValueType;
}

export interface GeneralSettingsState {
   importBehaviour: Setting<ImportBehaviour>;
   resetSettings: Setting<() => void>;
}

export enum ColorScheme {
   light = 'light',
   dark = 'dark',
}

export enum Themes {
   default = 'default',
   nord = 'nord',
}

export interface StyleSettingsState {
   colorScheme: Setting<ColorScheme>;
   theme: Setting<Themes>;
}

export interface SettingsState {
   generalSettings: GeneralSettingsState;
   styleSettings: StyleSettingsState;
}

export interface SettingsContext {
   getCurrentSettings: () => SettingsState;
   changeSetting: (slice: SettingsStateSlice, value: SettingsStateValue) => void;
   getChangedSettings: () => SettingsState;
   revertChangedSettings: () => void;
   saveAppliedSettings: () => void;
}
