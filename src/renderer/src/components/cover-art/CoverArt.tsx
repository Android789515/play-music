import type { Path } from '@globalTypes/fileTypes';

import defaultCoverArt from './assets/icons/default-cover-art.svg';

import styles from './CoverArt.module.scss';

interface Props {
   coverArtLocation?: Path;
}

export const CoverArt = ({ coverArtLocation }: Props) => {
   return (
      <div className={styles.coverArt}>
         <img
            src={coverArtLocation || defaultCoverArt}
            alt='Cover art'
            className={styles.coverArtIcon}
         />
      </div>
   );
};
