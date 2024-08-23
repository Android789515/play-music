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
         className={styles.libraryLoadingLayout}
      >
         <Icon
            customStyles={styles.loadingIcon}
            iconPath={appIconLight}
            alt={'App Icon'}
         />

         {isSlowLoad && (<>
            <AsyncSpinner
               customStyles={{
                  layout: styles.loadingSpinnerLayout,
                  spinner: styles.loadingSpinner,
               }}
            />

            <LoadingTitle />
         </>)}
      </div>
   );
};
