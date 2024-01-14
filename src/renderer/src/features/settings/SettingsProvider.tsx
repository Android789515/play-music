import { ReactNode, createContext, useState, useEffect } from 'react';

import type { SettingsContext, SettingsState } from './types';
import type { SettingsStateSlice, SettingsStateValue } from './types';
import { SettingType, Theme } from './types';

export const settingsContext = createContext<SettingsContext>({
   getCurrentSettings: () => ({} as SettingsState),
   changeSetting: () => {},
   getChangedSettings: () => ({} as SettingsState),
   revertChangedSettings: () => {},
   saveAppliedSettings: () => {},
});

interface Props {
   children: ReactNode;
}

export const SettingsProvider = ({ children }: Props) => {
   const defaultSettings: SettingsState = {
      generalSettings: {
      },
      styleSettings: {
         theme: {
            type: SettingType.toggle,
            value: Theme.dark,
         },
      },
   };

   const [ currentSettings, setCurrentSettings ] = useState(defaultSettings);

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

      root.style.colorScheme = changedSettings.styleSettings.theme.value;
   };

   useEffect(applyChangedSettings, [ changedSettings ]);

   const revertChangedSettings = () => {
      setChangedSettings(currentSettings);
   };

   const saveAppliedSettings = () => {
      setCurrentSettings(changedSettings);
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
         {children}
      </Provider>
   );
};
