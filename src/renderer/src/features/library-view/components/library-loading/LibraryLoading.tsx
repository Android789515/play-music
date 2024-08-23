import styles from './LibraryLoading.module.scss';
import appIconLight from '@resources/icon-light.png';

import { Icon } from 'components/icon';
import { AsyncSpinner } from 'components/async-spinner';
import { LoadingTitle } from './components/loading-title';

interface Props {
   isSlowLoad?: boolean;
}

export const LibraryLoading = ({ isSlowLoad = false }: Props) => {
   

   return (
      <div
         className={`
            ${styles.libraryLoadingLayout}
            ${isSlowLoad ? styles.slowLoad : ''}
         `}
      >
         <Icon
            customStyles={styles.loadingIcon}
            iconPath={appIconLight}
            alt={'App Icon'}
         />

         <AsyncSpinner
            customStyles={{
               layout: `
                  ${styles.loadingSpinnerLayout}
                  ${isSlowLoad ? styles.slowLoad : ''}
               `,
               spinner: styles.loadingSpinner,
            }}
         />

         <LoadingTitle
            isSlowLoad={isSlowLoad}
         />

      </div>
   );
};
