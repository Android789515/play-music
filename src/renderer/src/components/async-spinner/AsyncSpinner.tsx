import type { CSS_Class } from 'types/cssTypes';

import styles from './AsyncSpinner.module.scss';

interface Props {
   customStyles?: {
      layout: CSS_Class;
      spinner: CSS_Class;
   };
}

export const AsyncSpinner = ({ customStyles }: Props) => {
   return (
      <svg className={`
         ${styles.asyncSpinnerLayout}
         ${customStyles?.layout}
      `}>
         <circle
            className={`
               ${styles.asyncSpinner}
               ${customStyles?.spinner}
            `}
         />
      </svg>
   );
};
