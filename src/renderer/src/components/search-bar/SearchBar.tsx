import type { ChangeEvent } from 'react';

import type { SearchQuery } from './types';

import searchIcon from './assets/icons/search.svg';
import styles from './SearchBar.module.scss';

import { SearchBarLayout } from './components/layout';
import { Icon } from 'components/icon';

interface Props {
   searchQuery: SearchQuery;
   setSearchQuery: (query: SearchQuery) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: Props) => {
   const handleInput = ({ target }: ChangeEvent) => {
      const inputBox = target as HTMLInputElement;

      setSearchQuery(inputBox.value);
   };

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
               value={searchQuery}
               onChange={handleInput}
            />
         </SearchBarLayout>
      </div>
   );
};
