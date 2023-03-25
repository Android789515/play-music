import { SyntheticEvent, useRef, useEffect } from 'react';

import type { Path } from '@globalTypes/fileTypes';
import type { MediaControls } from 'features/media-player/types';

interface Props {
   songPath: Path;
   controls: MediaControls;
   updateAudioTime: (currentTime: number) => void;
   onSongEnd?: (event: SyntheticEvent<HTMLAudioElement>) => void;
}

export const Speaker = ({ songPath, controls, updateAudioTime, onSongEnd }: Props) => {
   const speakerRef = useRef<HTMLAudioElement>(null);
   const speaker = speakerRef.current;

   const syncSpeakerWithControls = () => {
      const { isPaused, volume } = controls;

      if (speaker) {
         speaker.volume = volume;

         if (isPaused) {
            speaker.pause();
         } else {
            speaker.play();
         }
      }
   };

   useEffect(syncSpeakerWithControls);

   const syncAudioTime = (event: SyntheticEvent<HTMLAudioElement, Event>) => {
      const speaker = event.target as HTMLAudioElement;

      const { time } = controls;
      const shouldSyncToControls = (
         time > speaker.currentTime + 1
         || time < speaker.currentTime - 1
      );

      if (shouldSyncToControls) {
         speaker.currentTime = time
      } else {
         updateAudioTime(speaker.currentTime);
      }
   };

   // The song path is encoded.
   const audioTrack = 'media://' + decodeURI(songPath);
   const { isMuted } = controls;
   return (
      <audio
         src={audioTrack}
         autoPlay
         muted={isMuted}
         onTimeUpdate={syncAudioTime}
         onEnded={onSongEnd}
         ref={speakerRef}
      />
   );
};
