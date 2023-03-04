import { Dispatch, SetStateAction, useState } from 'react';

import { within } from '@utils/number';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

import { MediaControlButton } from '../../components/media-control-button';
import { VolumeBar } from './components';

interface Props {
   volume: number;
   setVolume: Dispatch<SetStateAction<number>>;
}

export const VolumeButton = ({ volume, setVolume }: Props) => {
   const [ isHovered, setIsHovered ] = useState(false);

   const [ isFocused, setIsFocused ] = useState(false);

   const getVolumeIcon = () => {
      if (volume === 0) {
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

   return (
      <MediaControlButton
         name='Volume'
         iconPath={getVolumeIcon()}
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
