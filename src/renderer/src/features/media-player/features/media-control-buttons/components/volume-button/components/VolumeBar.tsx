import styles from './VolumeBar.module.scss';

import { SlideableBar } from 'components/slideable-bar';

interface Props {
   volume: number;
   setVolume: (newVolume: number) => void;
}

export const VolumeBar = ({ volume, setVolume }: Props) => {
   const volumePercent = volume * 100;
   const adjustVolume = percentage => percentage < 2 ? 0 : percentage;

   return (
      <div className={styles.volumeBarBackground}>
         <SlideableBar
            vertical
            value={`${adjustVolume(volumePercent)}%`}
            setBarValue={barValue => {
               setVolume(adjustVolume(barValue) / 100);
            }}
            barStyles={styles.volumeBar}
         />
      </div>
   );
};
