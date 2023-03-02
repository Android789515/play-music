import type { ReactNode } from 'react';

import type { CSS_Class } from 'types/cssTypes';

import styles from './Button.module.scss';

interface Props {
   customStyles?: CSS_Class;
   children?: ReactNode;
}

export const Button = ({ customStyles = '', children, ...rest }: Props) => {
   return (
      <button
         tabIndex={1}
         className={`
            ${styles.buttonDefaults}
            ${customStyles}
         `}
         {...rest}
      >
         {children}
      </button>
   );
};
