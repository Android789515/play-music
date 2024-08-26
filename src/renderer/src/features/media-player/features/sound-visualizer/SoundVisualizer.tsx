import { useState, useEffect, useRef } from 'react';

import styles from './SoundVisualizer.module.scss';

import { SlideableBar } from 'components/slideable-bar';

interface Props {
   buffer: {
      length: number;
      data: Uint8Array;
   };
}

export const SoundVisualizer = ({ buffer: { length, data } }: Props) => {

   const getBarHeight = (): `${number}%` => {
      if (length) {

         for (let index = 0; index < length; index++) {
            const initialBarHeight = data[ index ];

            const adjustedBarHeight = initialBarHeight > 100
               ? initialBarHeight / 10
               : initialBarHeight;

            return `${adjustedBarHeight}%`;
         }

         return '0%';
      } else {
         return '0%';
      }
   };

   return (
      <div
         className={styles.soundVisualizer}
      >
         <div></div>
         <SlideableBar
            value={getBarHeight()}
            setBarValue={() => {}}
            barStyles={styles.bar}
            barValueStyles={styles.barValue}
         />
      </div>
   );
};
