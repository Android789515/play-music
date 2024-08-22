import styles from './LibraryLoading.module.scss';

import { AnimatedEllipsis } from './components/animated-ellipsis';
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
         <h1
            className={styles.loadingTitle}
         >
            Loading Library

            {ThreeElipsis}
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
