import styles from './LibraryViewHeader.module.scss';

import { SearchBar } from 'components/search-bar';

export const LibraryViewHeader = () => {
   return (
      <div className={styles.libraryViewHeader}>
         <SearchBar />
      </div>
   );
};
