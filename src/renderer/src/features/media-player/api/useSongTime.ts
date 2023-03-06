import { useRecoilState } from 'recoil';

import { songTimeState } from '../stores/songTime';

export const useSongTime = () => {
   const [ songTime, updateSongTime ] = useRecoilState(songTimeState);

   return {
      songTime,
      updateSongTime,
   };
};