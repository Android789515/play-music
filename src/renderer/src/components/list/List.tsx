import type { ReactNode, MutableRefObject } from 'react';

import type { CSS_Class } from 'types/cssTypes';

import styles from './List.module.scss';

interface Props {
   customStyles?: CSS_Class;
   needsRef?: MutableRefObject<HTMLUListElement | null>
   children: ReactNode;
}

export const List = ({ customStyles = '', needsRef, children }: Props) => {
   return (
      <ul
         className={`
            ${styles.listDefaults}
            ${customStyles}
         `}
         ref={needsRef}
      >
         {children}
      </ul>
   );
};
