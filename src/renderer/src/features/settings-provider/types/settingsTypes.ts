export type SettingsStateSlice = keyof SettingsState;
export type SettingsStateValue = SettingsState[keyof SettingsState];

export enum SettingType {
   toggle,
   dropDownSelect,
}

export interface Setting<ValueType> {
   type: SettingType;
   options: ValueType[];
   defaultValue: ValueType;
   value: ValueType;
}

export enum ImportBehaviour {
   move = 'move',
   copy = 'copy',
}

export interface GeneralSettingsState {
   importBehaviour: Setting<ImportBehaviour>;
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
   colorScheme: Setting<ColorScheme>,
   theme: Setting<Themes>,
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
