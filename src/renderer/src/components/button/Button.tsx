import type { ReactNode } from 'react';

import type { CSS_Class } from 'types/cssTypes';

import styles from './Button.module.scss';

interface Props {
   customStyles?: CSS_Class;
   children?: ReactNode;
}

export const Button = ({ customStyles = '', children }: Props) => {
   return (
      <button className={`
         ${styles.buttonDefaults}
         ${customStyles}
      `}>
         {children}
      </button>
   );
};
