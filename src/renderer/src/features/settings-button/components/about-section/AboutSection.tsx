import styles from './AboutSection.module.scss';

export const AboutSection = () => {
   const Versions = Object.entries(window.appInfo.versions)
      .map(([ techName, versionNumber ], index) => {
         return (
            <p key={index}>
               {techName}: {versionNumber}
            </p>
         );
      });

   return (
      <section
         className={styles.aboutSection}
      >
         <h2>
            About
         </h2>

         {Versions}
      </section>
   );
};
