import { useState, useEffect } from 'react';

import type { VolumeStates } from './volumeTypes';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

import { MediaControlButton } from '../../components/media-control-button';
import { VolumeBar } from './components';

interface Props {
   // Low, medium, or high
   volumeState: VolumeStates;
}

export const VolumeButton = ({ volumeState }: Props) => {
   const [ isHovered, setIsHovered ] = useState(false);

   useEffect(() => {
      console.log(isHovered);
   }, [isHovered]);

   return (
      <MediaControlButton
         name='Volume'
         iconPath={mediumVolumeIcon}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <VolumeBar
            volumeButtonHover={isHovered}
         />
      </MediaControlButton>
   );
};
