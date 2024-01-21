import styles from './Versions.module.scss';

import { List } from 'components/list';

export const Versions = () => {
   const Versions = Object.entries(window.appInfo.versions)
      .map(([techName, versionNumber], index) => {
         return (
            <li
               key={index}
               className={styles.version}
            >
               <span
                  className={styles.techName}
               >
                  {techName}
               </span>

               <span>
                  {': '}
               </span>

               <span
                  className={styles.versionNumber}
               >
                  {versionNumber}
               </span>
            </li>
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
