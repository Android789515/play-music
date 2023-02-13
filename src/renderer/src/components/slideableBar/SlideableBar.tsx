import { CSS_Class } from 'types/cssTypes';

import styles from './SlideableBar.module.scss';

type BarValue = `${string}%`;
interface Props {
   value: BarValue;
   barStyles?: CSS_Class;
   barValueStyles?: CSS_Class;
}

export const SlideableBar = ({ value, barStyles, barValueStyles }: Props) => {
   return (
      <div
         tabIndex={1}
         className={`
            ${styles.bar}
            ${barStyles}
         `}
      >
         <div
            style={{ width: value }}
            className={`
               ${styles.barValue}
               ${barValueStyles}
            `}
         ></div>
      </div>
   );
};