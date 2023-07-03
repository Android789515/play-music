import { useState } from 'react';

import chevronUpIcon from './assets/icons/chevron-up.svg';
import styles from './ArrowToggle.module.scss';

import { IconButton } from 'components/icon-button';

interface Props {
   onArrowUp: () => void;
   onArrowDown: () => void;
}

export const ArrowToggle = ({ onArrowUp, onArrowDown }: Props) => {
   const [ isArrowUp, setArrow ] = useState(true);
   
   const runArrowDirectionEvent = () => {
      if (isArrowUp) {
         onArrowUp();
      } else {
         onArrowDown();
      }
   };

   const switchArrowDirection = () => {
      setArrow(direction => {
         // For clarity
         const oppositeDirection = !direction;

         return oppositeDirection;
      })
   };

   return (
      <IconButton
         name='Song Queue Expander'
         buttonStyles={styles.arrowToggle}
         iconPath={chevronUpIcon}
         iconStyles={`
            ${styles.arrowToggleIcon}
            ${!isArrowUp ? styles.arrowToggleIcon_OtherDirection : ''}
         `}
         onClick={() => {
            runArrowDirectionEvent();
            switchArrowDirection();
         }}
      />
   );
};
