import { SlideableBar } from 'components/slideableBar';

export const SongDurationBar = () => {

   const getSongCompletion = () => {
      // const completionPercent = (songTime / songPlaying.duration) * 100;
      const completionPercent = 65;

      return completionPercent;
   };

   const setSongTime = (rawBarValue: number) => {
      // const timeInSong = (rawBarValue / 100) * songPlaying.duration;
   };

   return (
      <SlideableBar
         value={`${getSongCompletion()}%`}
         setBarValue={setSongTime}
      />
   );
};