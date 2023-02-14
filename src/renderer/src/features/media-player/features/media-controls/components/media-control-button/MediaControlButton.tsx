import type { ReactNode } from 'react';

import { capitalize } from 'utils/string';

import playIcon from './assets/icons/play.svg';
import pauseIcon from './assets/icons/pause.svg';
import stopIcon from './assets/icons/stop.svg';
import fastForwardIcon from './assets/icons/fast-forward.svg';
import loopIcon from './assets/icons/loop.svg';
import shuffleIcon from './assets/icons/shuffle.svg';

import styles from './MediaControlButton.module.scss';

import { IconButton } from 'components/icon-button';

interface Props {
   name: string;
   iconPath: string;
   children?: ReactNode;
   [ prop: string ]: any;
}

export const MediaControlButton = ({ name, iconPath, children, ...rest }: Props) => {
   const getIcon = () => {
      switch (name.toLocaleLowerCase()) {
         case 'play': return playIcon;
         
         case 'pause': return pauseIcon;
         
         case 'stop': return stopIcon;

         // Rewind button class 
         // rotates it 180 deg
         case 'rewind': return fastForwardIcon;
         case 'fast forward': return fastForwardIcon;
         
         case 'loop': return loopIcon;

         case 'shuffle': return shuffleIcon;

         // Not used
         default: return '';
      }
   };

   const getClassName = () => {
      const [ firstWord, ...rest ] = name.split(' ');

      const className = (
         firstWord.toLowerCase()
         + rest.map(word => capitalize(word)).join('')
      );

      return className;
   };
   
   return (
      <IconButton
         name={name}
         iconPath={iconPath || getIcon()}
         buttonStyles={`
            ${styles.mediaControlButton}
            ${styles[ getClassName() + 'Button' ]}
         `}
         iconStyles={`
            ${styles.mediaControlButtonIcon}
            ${styles[ getClassName() + 'Icon' ]}
         `}
         {...rest}
      >
         {children}
      </IconButton>
   );
};
