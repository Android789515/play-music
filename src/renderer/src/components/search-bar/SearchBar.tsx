import searchIcon from './assets/icons/search.svg';
import styles from './SearchBar.module.scss';

import { SearchBarLayout } from './components';
import { Icon } from 'components/icon';

export const SearchBar = () => {
   return (
      <div className={styles.searchBar}>
         <SearchBarLayout>
            <Icon
               iconPath={searchIcon}
               alt={'Search'}
               customStyles={styles.searchIcon}
            />

            <input
               className={styles.searchBarInput}
               placeholder='Search'
               type='search'
            />
         </SearchBarLayout>
      </div>
   );
};
