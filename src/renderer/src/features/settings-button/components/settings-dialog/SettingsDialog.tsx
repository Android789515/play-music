import { useState } from 'react';
import { v4 as newUUID } from 'uuid';

import type { Category } from '../categories/types';
import type { UUID } from '@globalTypes/stringTypes';

import styles from './SettingsDialog.module.scss';

import { Categories } from '../categories';
import { GeneralSettings } from '../general-settings';

export const SettingsDialog = () => {
   const [ categories, _ ] = useState([
      {
         id: newUUID(),
         name: 'General',
         component: <GeneralSettings />,
      },
      {
         id: newUUID(),
         name: 'Style',
         component: null,
      },
      {
         id: newUUID(),
         name: 'About',
         component: null,
      },
   ]);

   const firstCategoryID = categories[0].id;
   const [ activeCategory, setActiveCategory ] = useState<UUID>(firstCategoryID);

   const renderCategoryContent = (activeCategory: UUID) => {
      return categories.find(({ id }) => {
         const isActiveCategory = activeCategory === id;

         return isActiveCategory;
      })?.component;
   };

   return (
      <section
         className={styles.dialogContent}
      >
         <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={id => setActiveCategory(id)}
         />

         {renderCategoryContent(activeCategory)}
      </section>
   );
};
