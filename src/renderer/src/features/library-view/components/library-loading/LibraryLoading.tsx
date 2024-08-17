import styles from './LibraryLoading.module.scss';

import { AsyncSpinner } from 'components/async-spinner';

export const LibraryLoading = () => {
   return (
      <AsyncSpinner
         customStyles={{
            layout: styles.loadingSpinnerLayout,
            spinner: styles.loadingSpinner,
         }}
      />
   );
};
