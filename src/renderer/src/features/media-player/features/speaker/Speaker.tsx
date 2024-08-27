import { useState, useRef, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import type { Path } from '@globalTypes/fileTypes';
import type { MediaControls, AudioEvent, AudioState } from 'features/media-player/types';
import { audioDataState } from '../audio-data-state';

interface Props {
   songPath: Path;
   controls: MediaControls;
   updateAudioTime: (currentTime: number) => void;
   onSongEnd?: (event: AudioEvent) => void;
}

export const Speaker = ({ songPath, controls, updateAudioTime, onSongEnd }: Props) => {
   const speakerRef = useRef<HTMLAudioElement | null>(null);
   const speaker = speakerRef.current;

   const audio = useRef<AudioState | null>(null);
   const [ _, setAudioData ] = useRecoilState(audioDataState);

   const cleanupAudio = () => {
      audio.current = null;
   };

   const createAudio = () => {
      if (speaker) {
         const context = new AudioContext();
         const analyser = context.createAnalyser();
         const source = context.createMediaElementSource(speaker);

         source.connect(analyser)
            .connect(context.destination);

         const length = analyser.frequencyBinCount;

         audio.current = {
            context,
            analyser,
            source,
         };

         setAudioData({
            buffer: {
               length,
               data: new Uint8Array(length),
            },
         });
      }

      return cleanupAudio;
   };

   useEffect(createAudio, [ speaker, setAudioData ]);

   const [ animationID, setAnimationID ] = useState(0);

   const updateAudio = () => {
      if (audio.current) {
         const { analyser } = audio.current;
         setAudioData(prevData => {
            const { buffer } = prevData;

            const data = new Uint8Array(buffer.length);

            analyser.getByteFrequencyData(data);

            return {
               ...prevData,
               buffer: {
                  ...prevData.buffer,
                  data,
               },
            };
         });

         audio.current = {
            ...audio.current,
            analyser,
         };
      }

      setAnimationID(
         requestAnimationFrame(updateAudio)
      );

      return () => {
         cancelAnimationFrame(animationID);
      };
   };

   // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(updateAudio, []);

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
   }, [ controls ]);

   const syncSpeakerWithControls = () => {
      if (speaker) {
         syncVolume(speaker);

         syncPaused(speaker);
      }
   };

   useEffect(syncSpeakerWithControls, [ syncVolume, syncPaused, speaker ]);

   const syncAudioTime = (event: AudioEvent) => {
      const speaker = event.target as HTMLAudioElement;

      const { time } = controls;
      const shouldSyncToControls = (
         time > speaker.currentTime + 1
         || time < speaker.currentTime - 1
      );

      if (shouldSyncToControls) {
         speaker.currentTime = time;
      } else {
         updateAudioTime(speaker.currentTime);
      }
   };

   const audioTrack = 'media://' + songPath;

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
