import { SyntheticEvent, useRef, useCallback, useEffect } from 'react';

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

   const syncVolume = useCallback((speaker: HTMLAudioElement) => {
      speaker.volume = controls.volume;
   }, [ controls.volume ]);

   const syncPaused = useCallback((speaker: HTMLAudioElement) => {
      const needToPause = controls.isPaused && !speaker.paused;
      const needToPlay = !controls.isPaused && speaker.paused;

      if (needToPause) {
         speaker.pause();
      } else if (needToPlay) {
         speaker.play();
      }
   }, [ controls.isPaused ]);

   const syncSpeakerWithControls = () => {
      if (speaker) {
         syncVolume(speaker);

         syncPaused(speaker);
      }
   };

   useEffect(syncSpeakerWithControls, [ syncVolume, syncPaused, speaker ]);

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
   
   return (
      <audio
         src={audioTrack}
         autoPlay
         muted={controls.isMuted}
         onTimeUpdate={syncAudioTime}
         onEnded={onSongEnd}
         ref={speakerRef}
      />
   );
};
