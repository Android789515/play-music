import { v4 as newUUID } from 'uuid';

import type { Category } from '../categories/types';

import styles from './SettingsDialog.module.scss';

import { Categories } from '../categories';

export const SettingsDialog = () => {
   const categories: Category[] = [
      { id: newUUID(), name: 'General' },
      { id: newUUID(), name: 'Style' },
      { id: newUUID(), name: 'About' },
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
