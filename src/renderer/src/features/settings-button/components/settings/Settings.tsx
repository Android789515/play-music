import type { SettingsStateValue, SettingsStateSlice } from 'features/settings/types';
import { splitPascalWord } from '@utils/string';

import styles from './Settings.module.scss';

import { SettingWidget } from '../setting-widget';
import { Setting } from '../setting/Setting';
import { SettingButton } from '../setting-button';

interface Props {
   settings: SettingsStateValue;
   settingsName: SettingsStateSlice;
   changeSetting: (slice: SettingsStateSlice, value: SettingsStateValue) => void;
}

export const Settings = ({ settings, settingsName, changeSetting }: Props) => {
   const SettingComponents = Object.entries(settings)
      .map(([ subSettingsName, setting ], index) => {
         
         return (
            <SettingWidget key={index}>
               <Setting name={splitPascalWord(subSettingsName)}>
                  <SettingButton
                     valueType={typeof setting.value}
                     setting={setting}
                     changeSetting={(newValue) => {
                        changeSetting(settingsName, {
                           ...settings,
                           [subSettingsName]: {
                              ...setting,
                              value: newValue,
                           },
                        });
                     }}
                  />
               </Setting>
            </SettingWidget>
         );
      });

   return (
      <section
         className={styles.settings}
      >
         {SettingComponents}
      </section>
   );
};
