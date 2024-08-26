import { useState, useRef, useCallback, useEffect } from 'react';

import type { Path } from '@globalTypes/fileTypes';
import type { MediaControls, AudioEvent, AudioState } from 'features/media-player/types';

import { SoundVisualizer } from '../sound-visualizer';

interface Props {
   songPath: Path;
   controls: MediaControls;
   updateAudioTime: (currentTime: number) => void;
   onSongEnd?: (event: AudioEvent) => void;
}

export const Speaker = ({ songPath, controls, updateAudioTime, onSongEnd }: Props) => {
   const speakerRef = useRef<HTMLAudioElement | null>(null);
   const speaker = speakerRef.current;

   const [ audio, setAudio ] = useState<AudioState | null>(null);

   const cleanupAudio = () => {
      setAudio(null);
   };

   const createAudio = () => {
      if (speaker) {
         const context = new AudioContext();
         const analyser = context.createAnalyser();
         const source = context.createMediaElementSource(speaker);

         source.connect(analyser)
            .connect(context.destination);

         const length = analyser.frequencyBinCount;

         setAudio({
            context,
            analyser,
            source,
            buffer: {
               length,
               data: new Uint8Array(length),
            },
         });
      }

      return cleanupAudio;
   };

   useEffect(createAudio, [ speaker ]);

   const [ animationID, setAnimationID ] = useState(0);

   const updateAudio = () => {
      setAudio(prevAudio => {
         if (prevAudio) {
            const { analyser, buffer } = prevAudio;
            const data = new Uint8Array(buffer.length);

            analyser.getByteFrequencyData(data);

            return {
               ...prevAudio,
               buffer: {
                  ...buffer,
                  data,
               },
            };
         }

         return prevAudio;
      });

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
      <>
         <audio
            src={audioTrack}
            autoPlay
            muted={controls.isMuted}
            onTimeUpdate={syncAudioTime}
            onEnded={onSongEnd}
            ref={speakerRef}
         />

         { audio &&
            <SoundVisualizer
               buffer={audio.buffer}
            />
         }
      </>
   );
};
