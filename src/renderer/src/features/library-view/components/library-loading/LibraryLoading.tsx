import styles from './LibraryLoading.module.scss';
import appIconLight from '@resources/icon-light.png';
import appIconDark from '@resources/icon-dark.png';

import { AnimatedEllipsis } from './components/animated-ellipsis';
import { Icon } from 'components/icon';
import { AsyncSpinner } from 'components/async-spinner';

export const LibraryLoading = () => {
   const ThreeElipsis = [ ...Array(3) ].map((_, index) => (
      <AnimatedEllipsis
         key={index}
         order={index}
      />
   ));

   return (
      <div
         className={styles.libraryLoadingLayout}
      >
         <Icon
            customStyles={styles.loadingIcon}
            iconPath={appIconLight}
            alt={'App Icon'}
         />

         <AsyncSpinner
            customStyles={{
               layout: styles.loadingSpinnerLayout,
               spinner: styles.loadingSpinner,
            }}
         />

         <h1
            className={styles.loadingTitle}
         >
            Loading Library

            {ThreeElipsis}
         </h1>

      </div>
   );
};
