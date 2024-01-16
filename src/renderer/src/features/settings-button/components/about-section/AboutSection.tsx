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
      <section>
         <h2>
            About
         </h2>

         {Versions}
      </section>
   );
};
