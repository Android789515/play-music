import { MouseEvent, useState } from 'react';

import { TagNames } from 'types/htmlTypes';
import { within } from '@utils/number';
import type { VolumeState } from '../../useVolumeControls';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

import { MediaControlButton } from '../../components/media-control-button';
import { VolumeBar } from './components';

interface Props {
   volumeState: VolumeState;
   isMuted: boolean;
   toggleMute: () => void;
}

export const VolumeButton = ({ volumeState, isMuted, toggleMute }: Props) => {
   const [ isHovered, setIsHovered ] = useState(false);

   const [ isFocused, setIsFocused ] = useState(false);

   const [ volume, setVolume ] = volumeState;
   const getVolumeIcon = () => {
      if (volume === 0 || isMuted) {
         return mutedIcon;
      }

      if (within(volume, [ 0, .49 ])) {
         return lowVolumeIcon;
      }

      if (within(volume, [ .5, .8 ])) {
         return mediumVolumeIcon;
      }

      return highVolumeIcon;
   };

   const handleButtonClick = (event: MouseEvent) => {
      const element = event.target as HTMLButtonElement;

      if (element.tagName === TagNames.img) {
         toggleMute();
      }
   };

   return (
      <MediaControlButton
         name='Volume'
         iconPath={getVolumeIcon()}
         onClick={handleButtonClick}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onFocus={() => setIsFocused(true)}
         onBlur={() => setIsFocused(false)}
      >
         <VolumeBar
            increaseContrast={isHovered || isFocused}
            volume={volume}
            setVolume={setVolume}
         />
      </MediaControlButton>
   );
};
