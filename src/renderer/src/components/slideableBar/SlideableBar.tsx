import { MouseEvent } from 'react';

import { CSS_Class } from 'types/cssTypes';
import { useDragBar } from './useDragBar';

import styles from './SlideableBar.module.scss';

type BarValue = `${string}%`;
interface Props {
   value: BarValue;
   setBarValue: (barValue: number) => void;
   barStyles?: CSS_Class;
   barValueStyles?: CSS_Class;
}

export const SlideableBar = ({ value, setBarValue, barStyles, barValueStyles }: Props) => {
   const { isDragging, enableDragging, disableDragging } = useDragBar();

   const handleMouseMove = (event: MouseEvent) => {
      const bar = event.target as HTMLDivElement;

      const { left, right } = bar.getBoundingClientRect();
      const barLeft = Math.floor(left);
      const barRight = Math.floor(right);

      const barSize = barRight - barLeft;
      const { clientX } = event;

      const locationClicked = clientX - barLeft;
      const percentage = (locationClicked / barSize) * 100;

      const barValue = Number(percentage.toFixed(1));
      setBarValue(barValue);
   };

   return (
      <div
         tabIndex={1}
         className={`
            ${styles.bar}
            ${barStyles}
         `}
         onMouseDown={event => {
            enableDragging();
            handleMouseMove(event);
         }}
         onMouseMove={event => {
            if (isDragging) {
               handleMouseMove(event);
            }
         }}
         onMouseUp={disableDragging}
         onMouseLeave={disableDragging}
      >
         <div
            style={{ width: value }}
            className={`
               ${styles.barValue}
               ${value === '100%' ? styles.barValueFull : ''}
               ${barValueStyles}
            `}
         ></div>
      </div>
   );
};