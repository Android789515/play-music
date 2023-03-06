import { Song } from '@api/types';
import { useSongTime } from 'features/media-player/api';

import { SlideableBar } from 'components/slideableBar';

interface Props {
   songPlaying: Song;
}

export const SongDurationBar = ({ songPlaying }: Props) => {
   const { songTime, updateSongTime } = useSongTime();

   const getSongCompletion = () => {
      const completionPercent = (songTime / songPlaying.duration) * 100;

      return completionPercent;

      return 0;
   };

   const setSongTime = (rawBarValue: number) => {
      const timeInSong = (rawBarValue / 100) * songPlaying.duration;

      updateSongTime(timeInSong);
   };

   return (
      <SlideableBar
         value={`${getSongCompletion()}%`}
         setBarValue={setSongTime}
      />
   );
};