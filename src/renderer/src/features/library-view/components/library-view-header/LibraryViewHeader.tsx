import styles from './LibraryViewHeader.module.scss';

import { SearchBar } from 'components/search-bar';

export const LibraryViewHeader = () => {
   return (
      <div className={styles.libraryViewTopBar}>
         <SearchBar />
      </div>
   );
};
