import { Song } from '@api/types';
import { useSongTime } from 'features/media-player/api';

import { SlideableBar } from 'components/slideableBar';

interface Props {
   songPlaying: Song | null;
}

export const SongDurationBar = ({ songPlaying }: Props) => {
   const { songTime, updateSongTime } = useSongTime();

   const getSongCompletion = () => {
      if (songPlaying) {
         const completionPercent = (songTime / songPlaying.duration) * 100;

         return completionPercent;
      }

      return 0;
   };

   const setSongTime = (rawBarValue: number) => {
      if (songPlaying) {
         const timeInSong = (rawBarValue / 100) * songPlaying.duration;
         
         updateSongTime(timeInSong);
      }
   };

   return (
      <SlideableBar
         value={`${getSongCompletion()}%`}
         setBarValue={setSongTime}
      />
   );
};