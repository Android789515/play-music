import searchIcon from './assets/icons/search.svg';
import styles from './SearchBar.module.scss';

import { SearchBarLayout } from './components';

export const SearchBar = () => {
   return (
      <div className={styles.searchBar}>
         <SearchBarLayout>
            <img
               className={styles.searchIcon}
               src={searchIcon}
               alt="Search"
            />

            <input
               className={styles.searchBarInput}
               placeholder='Search'
               type='text'
            />
         </SearchBarLayout>
      </div>
   );
};
