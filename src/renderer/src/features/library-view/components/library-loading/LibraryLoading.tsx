import styles from './LibraryLoading.module.scss';
import appIconLight from '@resources/icon-light.png';

import { Icon } from 'components/icon';
import { SlowLoadContent } from './components/slow-load-content';

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

         {isSlowLoad
            && <SlowLoadContent />
         }
      </div>
   );
};
