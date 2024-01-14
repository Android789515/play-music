import type { SettingsStateValue, SettingsStateSlice } from 'features/settings/types';
import { splitPascalWord } from '@utils/string';

import styles from './Settings.module.scss';

import { SettingWidget } from '../setting-widget';
import { Setting } from '../setting/Setting';
import { ToggleSwitch } from 'components/toggle-switch';

interface Props {
   settings: SettingsStateValue;
   changeSetting: (slice: SettingsStateSlice, value: SettingsStateValue) => void;
}

export const Settings = ({ settings, changeSetting }: Props) => {
   const SettingComponents = Object.entries(settings)
      .map(([ name, setting ], index) => {
         
         return (
            <SettingWidget key={index}>
               <Setting name={splitPascalWord(name)}>
                  <ToggleSwitch
                     isToggled={setting.value === 'dark'}
                     text={setting.value}
                     onToggle={(nowDark) => {
                        changeSetting('styleSettings', {
                           colorScheme: {
                              type: setting.type,
                              value: nowDark ? 'dark' : 'light',
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
