import styles from './AboutSection.module.scss';

import { Versions } from './components/versions';

export const AboutSection = () => {
   return (
      <section
         className={styles.aboutSection}
      >
         <h2>
            About
         </h2>

         <Versions />
      </section>
   );
};
