import type { Dispatch, SetStateAction } from 'react';

import styles from './VolumeBar.module.scss';

import { SlideableBar } from 'components/slideableBar';

interface Props {
   increaseContrast?: boolean;
   volume: number;
   setVolume: Dispatch<SetStateAction<number>>;
}

export const VolumeBar = ({ increaseContrast: volumeButtonHover, volume, setVolume }: Props) => {

   return (
      <SlideableBar
         value={`${volume * 100}%`}
         setBarValue={barValue => setVolume(barValue / 100)}
         barStyles={`
            ${styles.volumeBar}
            ${volumeButtonHover ? styles.volumeBarHighContrast : ''}
         `}
         barValueStyles={`
            ${styles.volume}
            ${volume === 1 ? styles.volumeFull : ''}
         `}
      />
   );
};
