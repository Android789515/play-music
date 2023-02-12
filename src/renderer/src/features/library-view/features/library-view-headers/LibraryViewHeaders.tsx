import styles from './LibraryViewHeaders.module.scss';

import { LibraryViewHeader } from '../../components/library-view-header'

export const LibraryViewHeaders = () => {
   return (
      <div className={styles.libraryViewHeaders}>
         <LibraryViewHeader
            headerText={'Title'}
            isSorting
         />

         <LibraryViewHeader
            headerText={'Artist'}
         />

         <LibraryViewHeader
            headerText={'Duration'}
         />
      </div>
   );
};
