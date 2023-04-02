import type { ReactNode } from 'react';

import { capitalize } from '@utils/string';

import styles from './Widget.module.scss';

type BorderSide = (
   | 'top'
   | 'bottom'
   | 'left'
   | 'right'
   | 'all'
);

interface Props {
   borderSide: BorderSide;
   children: ReactNode;
}

export const Widget = ({ borderSide, children }: Props) => {
   const borderStyles = 'widgetBorder' + capitalize(borderSide);

   return (
      <div
         className={`
            ${styles.widget}
            ${styles[borderStyles]}
         `}
      >
         {children}
      </div>
   );
};
