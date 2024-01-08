import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

import { SettingsState } from '../types';
import { settingsState } from '../stores';

export const useSettings = () => {
   const [ settings, updateSettings ] = useRecoilState(settingsState);
   
   const applySettings = () => {
      const root = document.documentElement;

      root.style.fontSize = settings.generalSettings.fontSize;
   };

   useEffect(() => {
      console.log(document.documentElement.style);
   });
   // useEffect(applySettings, [ settings.generalSettings.fontSize ]);

   const getSettings = (slice?: keyof SettingsState) => {
      if (slice) {
         return settings[slice];
      } else {
         return settings;
      }
   };

   const setSettings = (slice?: keyof SettingsState) => {
      return (payload: SettingsState[keyof SettingsState]) => {
         updateSettings(prevSettings => {
            if (slice) {
               return {
                  ...prevSettings,
                  [slice]: payload
               };
            } else {
               return {
                  ...prevSettings,
                  ...payload,
               };
            }
         });
      };
   };

   return {
      getSettings,
      setSettings,
      applySettings,
   };
};
