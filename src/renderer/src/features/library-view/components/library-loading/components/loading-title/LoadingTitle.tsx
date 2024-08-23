import styles from './LoadingTitle.module.scss';

import { AnimatedEllipsis } from '../animated-ellipsis';

interface Props {
   isSlowLoad: boolean;
}

export const LoadingTitle = ({ isSlowLoad }: Props) => {
   const ThreeElipsis = [ ...Array(3) ].map((_, index) => (
      <AnimatedEllipsis
         key={index}
         order={index}
      />
   ));

   return (
      <h1
         className={`
               ${styles.loadingTitle}
               ${isSlowLoad ? styles.slowLoad : ''}
            `}
      >
         Loading Library

         {ThreeElipsis}
      </h1>
   );
};
