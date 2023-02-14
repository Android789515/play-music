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
}

export const MediaControlButton = ({ name }:  Props) => {
   const getIcon = () => {
      console.log(shuffleIcon);
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
         iconPath={`./assets/icons/${getIcon()}.svg`}
         buttonStyles={`
            ${styles.mediaControlButton}
            ${styles[getClassName() + 'Button']}
         `}
         iconStyles={styles[getClassName() + 'Icon']}
      />
   );
};
