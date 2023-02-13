import type { VolumeStates } from './volumeTypes';

import styles from './VolumeButton.module.scss';

import { IconButton } from 'components/icon-button';

interface Props {
   // Low, medium, or high
   volumeState: VolumeStates;
}

export const VolumeButton = ({ volumeState }: Props) => {
   return (
      <IconButton
         name='Volume Button'
         iconPath={`./assets/icons/${volumeState}-volume.svg`}
         buttonStyles={styles.volumeButton}
         iconStyles={styles.volumeIcon}
      />
   );
};
