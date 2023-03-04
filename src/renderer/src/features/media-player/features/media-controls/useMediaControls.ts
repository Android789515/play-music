import { useState, useCallback } from 'react';

export const useMediaControls = () => {
   const [ isPaused, setIsPaused ] = useState(true);

   const pause = useCallback(() => {
      setIsPaused(true);
   }, []);

   const unPause = useCallback(() => {
      setIsPaused(false);
   }, []);

   const stop = useCallback((onStop: () => void) => {
      pause();

      onStop();
   }, [ pause ]);

   return {
      isPaused,
      pause,
      unPause,
      stop,
   };
};