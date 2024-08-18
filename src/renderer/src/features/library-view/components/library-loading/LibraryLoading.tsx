import styles from './LibraryLoading.module.scss';

import { AsyncSpinner } from 'components/async-spinner';

export const LibraryLoading = () => {
   return (
      <div
         className={styles.libraryLoadingLayout}
      >
         <h1
            className={styles.loadingTitle}
         >
            Initializing Library...
         </h1>

         <AsyncSpinner
            customStyles={{
               layout: styles.loadingSpinnerLayout,
               spinner: styles.loadingSpinner,
            }}
         />
      </div>
   );
};
