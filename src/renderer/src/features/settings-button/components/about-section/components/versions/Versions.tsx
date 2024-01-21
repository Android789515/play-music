import styles from './Versions.module.scss';

import { List } from 'components/list';
import { Version } from './components/version';

export const Versions = () => {
   const Versions = Object.entries(window.appInfo.versions)
      .map(([ techName, versionNumber ], index) => {
         return (
            <Version
               key={index}
               techName={techName}
               versionNumber={versionNumber}
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
