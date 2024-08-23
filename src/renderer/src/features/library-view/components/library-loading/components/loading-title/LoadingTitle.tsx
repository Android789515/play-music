import styles from './LoadingTitle.module.scss';

import { AnimatedEllipsis } from '../animated-ellipsis';

export const LoadingTitle = () => {
   const ThreeElipsis = [ ...Array(3) ].map((_, index) => (
      <AnimatedEllipsis
         key={index}
         order={index}
      />
   ));

   return (
      <h1
         className={styles.loadingTitle}
      >
         Loading Library

         {ThreeElipsis}
      </h1>
   );
};
