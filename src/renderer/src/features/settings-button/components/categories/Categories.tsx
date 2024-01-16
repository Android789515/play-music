import type { Category as CategoryType } from './types';

import styles from './Categories.module.scss';

import { List } from 'components/list';
import { Category } from './components/category';

interface Props {
   categories: CategoryType[];
   activeCategory: string;
   setActiveCategory: (categoryName: string) => void;
}

export const Categories = ({ categories, activeCategory, setActiveCategory }: Props) => {
   const renderCategories = (categories: CategoryType[]) => {
      return categories.map(({ name }, index) => {
         const isActiveCategory = activeCategory === name;
         
         return (
            <Category
               key={index}
               categoryName={name}
               isActiveCategory={isActiveCategory}
               setActiveCategory={setActiveCategory}
            />
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
