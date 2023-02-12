import styles from './LibraryViewTopBar.module.scss';

import { LibraryViewHeaders } from '../../features/library-view-headers';

export const LibraryViewTopBar = () => {
   return (
      <div className={styles.libraryViewTopBar}>
         <LibraryViewHeaders />
      </div>
   );
};
