import { useState } from 'react';

import type { VolumeStates } from './volumeTypes';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

import styles from './VolumeButton.module.scss';

import { MediaControlButton } from '../../components/media-control-button';

interface Props {
   // Low, medium, or high
   volumeState: VolumeStates;
}

export const VolumeButton = ({ volumeState }: Props) => {
   const [ isHovered, setIsHovered ] = useState(false);

   return (
      <MediaControlButton
         name='Volume'
         iconPath={mediumVolumeIcon}
         restProps={{
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false)
         }}
      >

      </MediaControlButton>
   );
};
