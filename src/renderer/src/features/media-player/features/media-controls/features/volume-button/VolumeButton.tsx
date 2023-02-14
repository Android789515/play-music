import type { VolumeStates } from './volumeTypes';

import mutedIcon from './assets/icons/muted.svg';
import lowVolumeIcon from './assets/icons/low-volume.svg';
import mediumVolumeIcon from './assets/icons/medium-volume.svg';
import highVolumeIcon from './assets/icons/high-volume.svg';

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
         iconPath={mediumVolumeIcon}
         buttonStyles={styles.volumeButton}
         iconStyles={styles.volumeIcon}
      />
   );
};
