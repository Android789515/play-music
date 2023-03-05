import { Dispatch, SetStateAction, useState } from 'react';

type Volume = number;
type VolumeSetter = Dispatch<SetStateAction<Volume>>;

export type VolumeState = [ Volume, VolumeSetter ];

export const useVolumeControls = () => {
   const volumeState: VolumeState = useState(.5);

   const [ isMuted, setIsMuted ] = useState(false);

   const toggleMute = () => setIsMuted(isCurrentlyMuted => !isCurrentlyMuted);

   return {
      volumeState,
      isMuted,
      toggleMute,
   };
};