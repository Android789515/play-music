import type { SettingsStateValue } from 'features/settings/types';

import styles from './Settings.module.scss';

import { SettingWidget } from '../setting-widget';
import { Setting } from '../setting/Setting';

interface Props {
   settings: SettingsStateValue;
}

export const Settings = ({ settings }: Props) => {
   const SettingComponents = Object.entries(settings)
      .map(([ name, values ], index) => {
         return (
            <SettingWidget key={index}>
               <Setting name={name}>
                  <></>
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
