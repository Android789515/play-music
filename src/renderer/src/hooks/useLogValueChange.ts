import { useEffect } from 'react';

interface HookOptions {
   message: string;
}

export const useLogValueChange = <Type>(valueToTrack: Type, options?: HookOptions) => {
   useEffect(() => {
      if (options?.message) {
         console.log(options.message);
      } else {
         console.log(valueToTrack);
      }
   }, [valueToTrack]);
};