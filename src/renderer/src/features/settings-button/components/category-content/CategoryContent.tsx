import type { ReactNode } from 'react';

import styles from './CategoryContent.module.scss';

interface Props {
   children: ReactNode;
}

export const CategoryContent = ({ children }: Props) => {
   return (
      <section
         className={styles.categoryContent}
      >
         {children}
      </section>
   );
};
