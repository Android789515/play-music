import type { Category } from '../categories/types';

import styles from './SettingsDialog.module.scss';

import { Categories } from '../categories';

export const SettingsDialog = () => {
   const categories: Category[] = [
      { id: '12', name: 'General' },
      { id: '3rfd', name: 'Style' },
      { id: 'lll', name: 'About' },
   ];

   return (
      <section
         className={styles.dialogContent}
      >
         <Categories
            categories={categories}
         />

         <section>
            
         </section>
      </section>
   );
};
