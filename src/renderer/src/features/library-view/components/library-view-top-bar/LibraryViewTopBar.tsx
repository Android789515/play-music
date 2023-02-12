import styles from './LibraryViewTopBar.module.scss';

import { SearchBar } from 'components/search-bar';
import { LibraryViewHeaders } from '../../features/library-view-headers';

export const LibraryViewTopBar = () => {
   return (
      <div className={styles.libraryViewTopBar}>
         <SearchBar />

         <LibraryViewHeaders />
      </div>
   );
};
