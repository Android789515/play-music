import { MouseEvent } from 'react';

import { CSS_Class } from 'types/cssTypes';
import { useDragBar } from './useDragBar';

import styles from './SlideableBar.module.scss';

type BarValue = `${string}%`;
interface Props {
   vertical?: boolean;
   value: BarValue;
   setBarValue: (barValue: number) => void;
   barStyles?: CSS_Class;
   barValueStyles?: CSS_Class;
}

export const SlideableBar = ({ vertical, value, setBarValue, barStyles, barValueStyles }: Props) => {
   const { isDragging, enableDragging, disableDragging } = useDragBar();

   const getBarSize = (bar: HTMLDivElement) => {
      const { top, bottom, left, right } = bar.getBoundingClientRect();

      return {
         startOfBar: vertical ? bottom : left,
         endOfBar: vertical ? top : right,
      };
   };

   const getBarValueClicked = (bar: HTMLDivElement, event: MouseEvent) => {
      const { clientX, clientY } = event;

      const { startOfBar, endOfBar } = getBarSize(bar);
      const barSize = endOfBar - startOfBar;

      const locationClicked = (
         vertical
            ? clientY - startOfBar
            : clientX - startOfBar
      );
      
      const percentage = (locationClicked / barSize) * 100;

      return Number(percentage.toFixed(1));
   };

   const validateBarValue = (barValue: number) => {
      if (barValue < 0) {
         return 0;
      }

      if (barValue > 100) {
         return 100;
      }

      return barValue;
   };

   const handleMouseMove = (event: MouseEvent) => {
      const bar = event.target as HTMLDivElement;      

      const barValue = getBarValueClicked(bar, event);
      
      setBarValue(validateBarValue(barValue));
   };

   return (
      <div
         tabIndex={1}
         className={`
            ${styles.bar}
            ${barStyles}
            ${vertical ? styles.verticalBar : ''}
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
            style={
               vertical
                  ? { height: value }
                  : { width: value }
            }
            className={`
               ${styles.barValue}
               ${value === '100%' ? styles.barValueFull : ''}
               ${barValueStyles}
            `}
         ></div>
      </div>
   );
};
