import type { Category } from './types';

import styles from './Categories.module.scss';

import { List } from 'components/list';
import { Button } from 'components/button';

interface Props {
   categories: Category[];
   activeCategory: string;
   setActiveCategory: (categoryName: string) => void;
}

export const Categories = ({ categories, activeCategory, setActiveCategory }: Props) => {
   const renderCategories = (categories: Category[]) => {
      return categories.map(({ name }, index) => {
         const isActiveCategory = activeCategory === name;
         
         return (
            <li key={index}>
               <Button
                  customStyles={`
                     ${styles.category}
                     ${isActiveCategory ? styles.activeCategory : ''}
                  `}
                  onClick={() => {
                     setActiveCategory(name);
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
