import styles from './SongDurationBar.module.scss';

import { SlideableBar } from 'components/slideable-bar';

interface Props {
   songDuration: number;
   currentTime: number;
   setCurrentTime: (newTime: number) => void;
}

export const SongDurationBar = ({ songDuration, currentTime, setCurrentTime }: Props) => {

   const getSongCompletion = () => {
      const completionPercent = (currentTime / songDuration) * 100;

      return completionPercent;
   };

   const handleBarValue = (rawBarValue: number) => {
      const newTime = (rawBarValue / 100) * songDuration;
      setCurrentTime(newTime);
   };

   return (
      <SlideableBar
         value={`${getSongCompletion()}%`}
         setBarValue={handleBarValue}
         barStyles={styles.songDurationBar}
      />
   );
};
