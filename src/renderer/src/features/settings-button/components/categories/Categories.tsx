import { useState } from 'react';

import type { UUID } from '@globalTypes/stringTypes';
import type { Category } from './types';

import styles from './Categories.module.scss';

import { List } from 'components/list';
import { Button } from 'components/button';

interface Props {
   categories: Category[];
}

export const Categories = ({ categories }: Props) => {
   const firstCategoryID = categories[0].id;
   const [ activeCategory, setActiveCategory ] = useState<UUID>(firstCategoryID);

   const isActiveCategory = (categoryID: UUID) => {
      return activeCategory === categoryID;
   };

   const renderCategories = (categories: Category[]) => {
      return categories.map(({ id, name }, index) => {
         return (
            <li key={index}>
               <Button
                  customStyles={`
                     ${styles.category}
                     ${isActiveCategory(id) ? styles.activeCategory : ''}
                  `}
                  onClick={() => {
                     setActiveCategory(id);
                  }}
               >
                  {name}
               </Button>
            </li>
         );
      });
   };

   return (
      <aside className={styles.categories}>
         <List customStyles={styles.categoriesLayout}>
            {renderCategories(categories)}
         </List>
      </aside>
   );
};
