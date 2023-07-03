import { MouseEvent, FocusEvent, useState } from 'react';

import { TagNames } from 'types/htmlTypes';
import { within } from '@utils/number';
import { useMediaPlayer } from 'features/media-player/api';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

import { WidgetFloater } from 'components/widget-floater';
import { MediaControlButton } from '../media-control-button';
import { VolumeBar } from './components';

export const VolumeButton = () => {
   const [ isHovered, setIsHovered ] = useState(false);

   const [ isFocused, setIsFocused ] = useState(false);
   
   const hideVolumeBar = () => {
      setIsHovered(false);

      setIsFocused(false);
   };

   const maybeHideVolumeBar = (event: FocusEvent) => {
      const {
         currentTarget: previouslyFocused,
         relatedTarget: nowFocused,
      } = event;

      if (previouslyFocused.contains(nowFocused)) {
         return;
      }

      hideVolumeBar();
   };

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
      const didNotClickBar = element.tagName !== TagNames.div;

      if (didNotClickBar) {
         toggleMute();
      }
   };

   const setVolume = (newVolume: number) => {
      updateControls('volume', newVolume);
   };

   return (
      // The whole button needs to be wrapped.
      // The bar relies on the button for its
      // positioning.
      <WidgetFloater>
         <MediaControlButton
            name='Volume'
            iconPath={getVolumeIcon()}
            onClick={handleButtonClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={hideVolumeBar}
            onFocus={() => setIsFocused(true)}
            onBlur={maybeHideVolumeBar}
         >
            { isHovered || isFocused ?
               <VolumeBar
                  volume={volume}
                  setVolume={setVolume}
               />
               : null }
         </MediaControlButton>
      </WidgetFloater>
   );
};
