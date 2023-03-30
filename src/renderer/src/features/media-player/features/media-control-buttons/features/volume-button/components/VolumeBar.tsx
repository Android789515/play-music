import styles from './VolumeBar.module.scss';

import { SlideableBar } from 'components/slideable-bar';

interface Props {
   increaseContrast?: boolean;
   volume: number;
   setVolume: (newVolume: number) => void;
}

export const VolumeBar = ({ increaseContrast: volumeButtonHover, volume, setVolume }: Props) => {

   return (
      <div className={styles.volumeBarBackground}>
         <SlideableBar
            vertical
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
      </div>
   );
};
