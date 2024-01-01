import type { UUID } from '@globalTypes/stringTypes';
import type { Category } from './types';

import styles from './Categories.module.scss';

import { List } from 'components/list';
import { Button } from 'components/button';

interface Props {
   categories: Category[];
   activeCategory: UUID;
   setActiveCategory: (categoryID: UUID) => void;
}

export const Categories = ({ categories, activeCategory, setActiveCategory }: Props) => {
   const renderCategories = (categories: Category[]) => {
      return categories.map(({ id, name }, index) => {
         const isActiveCategory = activeCategory === id;
         
         return (
            <li key={index}>
               <Button
                  customStyles={`
                     ${styles.category}
                     ${isActiveCategory ? styles.activeCategory : ''}
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
