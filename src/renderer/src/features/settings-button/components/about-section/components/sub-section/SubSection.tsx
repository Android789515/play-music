import type { ReactNode } from 'react';

import styles from './SubSection.module.scss';

interface Props {
   name: string;
   children: ReactNode;
}

export const SubSection = ({ name, children }: Props) => {
   return (
      <section
         className={styles.subSection}
      >
         <h3
            className={styles.subSectionName}
         >
            {name}
         </h3>

         {children}
      </section>
   );
};
