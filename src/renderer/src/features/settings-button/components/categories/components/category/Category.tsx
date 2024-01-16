import styles from './Category.module.scss';

import { Button } from 'components/button';

interface Props {
   categoryName: string;
   isActiveCategory: boolean;
   setActiveCategory: (categoryName: string) => void;
}

export const Category = ({ categoryName, isActiveCategory, setActiveCategory }: Props) => {
   return (
      <li>
         <Button
            customStyles={`
                     ${styles.category}
                     ${isActiveCategory ? styles.activeCategory : ''}
                  `}
            onClick={() => {
               setActiveCategory(categoryName);
            }}
         >
            {categoryName}
         </Button>
      </li>
   );
};
