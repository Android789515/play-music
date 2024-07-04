import { ReactNode, createContext, useState, useEffect } from 'react';

import type { SettingsContext, SettingsState } from './types';
import type { SettingsStateSlice, SettingsStateValue } from './types';
import { ImportBehaviour } from '@globalTypes/fileTypes';
import { SettingType, ColorScheme, Themes } from './types';

import { ThemeProvider } from 'components/theme-provider';

export const settingsContext = createContext<SettingsContext>({
   getCurrentSettings: () => ({} as SettingsState),
   changeSetting: () => {},
   getChangedSettings: () => ({} as SettingsState),
   revertChangedSettings: () => {},
   saveAppliedSettings: () => {},
});

const defaultSettings: SettingsState = {
   generalSettings: {
      importBehaviour: {
         type: SettingType.dropDownSelect,
         options: [...Object.values(ImportBehaviour)],
         defaultValue: ImportBehaviour.copy,
         value: ImportBehaviour.copy,
      }
   },
   styleSettings: {
      colorScheme: {
         type: SettingType.toggle,
         options: [...Object.values(ColorScheme)],
         defaultValue: ColorScheme.light,
         value: ColorScheme.light,
      },
      theme: {
         type: SettingType.dropDownSelect,
         options: [...Object.values(Themes)],
         defaultValue: Themes.default,
         value: Themes.default,
      },
   },
};

interface Props {
   children: ReactNode;
}

export const SettingsProvider = ({ children }: Props) => {
   const settingsKey = 'settings';

   const [ currentSettings, setCurrentSettings ] = useState(defaultSettings);

   useEffect(() => {
      window.api.loadData(settingsKey).then(savedSettings => {
         setCurrentSettings(
            savedSettings
               ? JSON.parse(savedSettings) as SettingsState
               : defaultSettings
         );
      });

   }, []);

   const [ changedSettings, setChangedSettings ] = useState(currentSettings);

   const getCurrentSettings = () => {
      return currentSettings;
   };

   const changeSetting = (slice: SettingsStateSlice, value: SettingsStateValue) => {
      setChangedSettings(prevSettings => {
         return {
            ...prevSettings,
            [slice]: value,
         };
      });
   };

   const getChangedSettings = () => {
      return changedSettings;
   };

   const applyChangedSettings = () => {
      const root = document.documentElement;

      root.style.colorScheme = changedSettings.styleSettings.colorScheme.value;
   };

   useEffect(applyChangedSettings, [ changedSettings ]);

   const revertChangedSettings = () => {
      setChangedSettings(currentSettings);
   };

   const saveAppliedSettings = () => {
      setCurrentSettings(changedSettings);

      const settingsToSave = JSON.stringify(changedSettings);

      window.api.saveData(settingsKey, settingsToSave);
   };

   const { Provider } = settingsContext;

   return (
      <Provider
         value={{
            getCurrentSettings,
            changeSetting,
            getChangedSettings,
            revertChangedSettings,
            saveAppliedSettings,
         }}
      >
         <ThemeProvider
            theme={changedSettings.styleSettings.theme.value}
         />

         {children}
      </Provider>
   );
};
