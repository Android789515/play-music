import styles from './LibraryViewTopBar.module.scss';

import { SearchBar } from 'components/search-bar';

export const LibraryViewTopBar = () => {
   return (
      <div className={styles.libraryViewTopBar}>
         <SearchBar />
      </div>
   );
};
