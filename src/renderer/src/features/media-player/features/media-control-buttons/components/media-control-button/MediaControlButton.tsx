import type { ReactNode, HTMLAttributes } from 'react';

import { capitalize } from '@utils/string';

import playIcon from './assets/icons/play.svg';
import pauseIcon from './assets/icons/pause.svg';
import stopIcon from './assets/icons/stop.svg';
import playNextIcon from './assets/icons/play-next.svg';
import loopIcon from './assets/icons/loop.svg';
import shuffleIcon from './assets/icons/shuffle.svg';

import styles from './MediaControlButton.module.scss';

import { IconButton } from 'components/icon-button';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   name: string;
   largeScreenOnly?: boolean;
   iconPath?: string;
   children?: ReactNode;
}

export const MediaControlButton = ({ name, largeScreenOnly, iconPath, children, ...rest }: Props) => {
   const getIcon = () => {
      switch (name.toLocaleLowerCase()) {
         case 'play': return playIcon;

         case 'pause': return pauseIcon;

         case 'stop': return stopIcon;

         // Rewind button class 
         // rotates it 180 deg
         case 'play previous': return playNextIcon;
         case 'play next': return playNextIcon;

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
            ${largeScreenOnly ? styles.largeScreenButton : ''}
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
