import type { Path } from '@globalTypes/fileTypes';

import defaultCoverArt from './assets/icons/default-cover-art.svg';

import styles from './CoverArt.module.scss';

import { Icon } from 'components/icon';

interface Props {
   coverArtLocation?: Path;
}

export const CoverArt = ({ coverArtLocation }: Props) => {
   return (
      <div className={styles.coverArt}>
         <Icon
            iconPath={coverArtLocation || defaultCoverArt}
            alt={'Cover Art'}
            customStyles={styles.coverArtIcon}
         />
      </div>
   );
};
