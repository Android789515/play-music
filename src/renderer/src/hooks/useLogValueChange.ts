import { useEffect } from 'react';

export const useLogValueChange = <Type>(valueToTrack: Type) => {
   useEffect(() => {
      console.log(valueToTrack);
   }, [valueToTrack]);
};