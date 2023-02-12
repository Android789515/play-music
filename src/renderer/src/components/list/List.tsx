import type { ReactNode } from 'react';

import type { CSS_Class } from 'src/renderer/src/types/cssTypes';

import styles from './List.module.scss';

interface Props {
   customStyles?: CSS_Class;
   children: ReactNode;
}

export const List = ({ customStyles = '', children }: Props) => {
   return (
      <ul className={`
         ${styles.listDefaults}
         ${customStyles}
      `}>
         {children}
      </ul>
   );
};
