import styles from './SlowLoadContent.module.scss';

import { AsyncSpinner } from 'components/async-spinner';
import { LoadingTitle } from '../loading-title';

export const SlowLoadContent = () => {
   return (
      <div
         className={styles.slowLoadContent}
      >
         <AsyncSpinner
            customStyles={{
               layout: styles.loadingSpinnerLayout,
               spinner: styles.loadingSpinner,
            }}
         />

         <LoadingTitle />
      </div>
   );
};
