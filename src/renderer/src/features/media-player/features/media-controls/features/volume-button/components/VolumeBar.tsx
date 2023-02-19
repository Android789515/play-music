import styles from './VolumeBar.module.scss';

import { SlideableBar } from 'components/slideableBar';

interface Props {
   increaseContrast?: boolean;
}

export const VolumeBar = ({ increaseContrast: volumeButtonHover }: Props) => {
   return (
      <SlideableBar
         value='45%'
         barStyles={`
            ${styles.volumeBar}
            ${volumeButtonHover ? styles.volumeBarHighContrast : ''}
         `}
         barValueStyles={styles.volume}
      />
   );
};
