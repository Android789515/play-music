import type { MouseEvent } from 'react';

import pinIcon from './assets/icons/pin.svg';
import styles from './PinButton.module.scss';

import { IconButton } from 'components/icon-button';

interface Props {
   isPinned: boolean;
   togglePinned: () => void;
}

const clearFocusOnButton = (button: HTMLButtonElement) => {
   button.blur();
};

export const PinButton = ({ isPinned, togglePinned }: Props) => {
   const handleClick = ({ currentTarget }: MouseEvent) => {
      clearFocusOnButton(currentTarget as HTMLButtonElement);

      togglePinned();
   };

   return (
      <IconButton
         name='Pin the song queue'
         buttonStyles={`
            ${styles.pinButton}
            ${isPinned ? styles.pinned : ''}
         `}
         iconPath={pinIcon}
         iconStyles={styles.pinButtonIcon}
         onClick={handleClick}
      />
   );
};
