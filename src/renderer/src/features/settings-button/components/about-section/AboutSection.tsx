import styles from './AboutSection.module.scss';

import { List } from 'components/list';

export const AboutSection = () => {
   const Versions = Object.entries(window.appInfo.versions)
      .map(([ techName, versionNumber ], index) => {
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
      <section
         className={styles.aboutSection}
      >
         <h2>
            About
         </h2>

         <List
            customStyles={styles.versions}
         >
            {Versions}
         </List>
      </section>
   );
};
