import { useRecoilState } from 'recoil';

import type { Song } from '@api/types';
import type { MediaControls, MediaControlsValue, MediaControlsUpdater, } from '../types';
import { mediaPlayerState } from '../stores';

export const useMediaPlayer = () => {
   const [ mediaPlayer, updateMediaPlayer ] = useRecoilState(mediaPlayerState);

   const playSong = (song: Song) => {
      updateMediaPlayer(mediaPlayer => {
         return {
            ...mediaPlayer,
            songPlaying: song,
            controls: {
               ...mediaPlayer.controls,
               isPaused: false,
               time: 0,
            }
         };
      });
   };

   const openMediaPlayer = () => {
      updateMediaPlayer(mediaPlayer => {
         return {
            ...mediaPlayer,
            isOpen: true,
         };
      });
   };

   const closeMediaPlayer = () => {
      updateMediaPlayer(mediaPlayer => {
         return {
            ...mediaPlayer,
            songPlaying: null,
            isOpen: false,
         };
      });
   };

   const updateControls = (control: keyof MediaControls, setter: MediaControlsValue | MediaControlsUpdater) => {
      const updatedControl = (
         typeof setter === 'function'
            ? setter(mediaPlayer.controls)
            : setter
      );

      updateMediaPlayer(mediaPlayer => {
         return {
            ...mediaPlayer,
            controls: {
               ...mediaPlayer.controls,
               [control]: updatedControl,
            }
         };
      });
   };

   return {
      mediaPlayer,
      playSong,
      openMediaPlayer,
      closeMediaPlayer,
      updateControls,
   };
};
