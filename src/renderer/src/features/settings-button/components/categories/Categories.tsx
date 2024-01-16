import type { Category as CategoryType } from './types';
import { aboutSectionName } from '../about-section';

import styles from './Categories.module.scss';

import { List } from 'components/list';
import { Category } from './components/category';

interface Props {
   categories: CategoryType[];
   activeCategory: string;
   setActiveCategory: (categoryName: string) => void;
}

export const Categories = ({ categories, activeCategory, setActiveCategory }: Props) => {
   const isActiveCategory = (categoryName: string) => {
      return activeCategory === categoryName;
   };
   
   const renderCategories = (categories: CategoryType[]) => {
      return categories.map(({ name }, index) => {         
         return (
            <Category
               key={index}
               categoryName={name}
               isActiveCategory={isActiveCategory(name)}
               setActiveCategory={setActiveCategory}
            />
         );
      });
   };

   return (
      <aside className={styles.categories}>
         <List customStyles={styles.categoriesLayout}>
            {renderCategories(categories)}
            
            <Category
               categoryName={aboutSectionName}
               isActiveCategory={isActiveCategory(aboutSectionName)}
               setActiveCategory={setActiveCategory}
            />
         </List>
      </aside>
   );
};
