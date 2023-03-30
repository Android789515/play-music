import { MouseEvent, useState } from 'react';

import { TagNames } from 'types/htmlTypes';
import { within } from '@utils/number';
import { useMediaPlayer } from 'features/media-player/api';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

import { MediaControlButton } from '../../components/media-control-button';
import { VolumeBar } from './components';

export const VolumeButton = () => {
   const [ isHovered, setIsHovered ] = useState(false);

   const [ isFocused, setIsFocused ] = useState(false);

   const { mediaPlayer: { controls }, updateControls } = useMediaPlayer();
   const { volume, isMuted } = controls;

   const getVolumeIcon = () => {
      if (volume === 0 || isMuted) {
         return mutedIcon;
      }

      if (volume < .4) {
         return lowVolumeIcon;
      }

      if (volume > .8) {
         return highVolumeIcon;
      }

      return mediumVolumeIcon;
   };

   const toggleMute = () => {
      updateControls('isMuted', oldControls => !oldControls.isMuted);
   };

   const handleButtonClick = (event: MouseEvent) => {
      const element = event.target as HTMLButtonElement;

      if (element.tagName === TagNames.img) {
         toggleMute();
      }
   };

   const setVolume = (newVolume: number) => {
      updateControls('volume', newVolume);
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
         { isHovered || isFocused ?
            <VolumeBar
               increaseContrast
               volume={volume}
               setVolume={setVolume}
            />
         : null }
      </MediaControlButton>
   );
};
