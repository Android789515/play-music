import styles from './AboutSection.module.scss';

import { Versions } from './components/versions';
import { SubSection } from './components/sub-section';

export const AboutSection = () => {
   const SubSections = [
      {
         name: 'versions',
         content: <Versions />,
      },
   ].map(({ name, content }, index) => {
      return (
         <SubSection
            key={index}
            name={name}
         >
            {content}
         </SubSection>
      );
   });

   return (
      <section
         className={styles.aboutSection}
      >
         <h2
            className={styles.aboutSectionTitle}
         >
            About
         </h2>

         {SubSections}
      </section>
   );
};
