import type { AppInfo } from '@globalTypes/appInfoTypes';

import styles from './Versions.module.scss';

import { List } from 'components/list';
import { Version } from './components/version';

const appInfo: AppInfo = await window.appInfo.getAppInfo();

export const Versions = () => {
   const Versions = appInfo.versions
      .map(({ name, version }, index) => {
         return (
            <Version
               key={index}
               name={name}
               version={version}
            />
         );
      });

   return (
      <List
         customStyles={styles.versions}
      >
         {Versions}
      </List>
   );
};
