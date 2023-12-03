import type { Path } from '@globalTypes/fileTypes';
import type { CSS_Class } from 'types/cssTypes';

import defaultCoverArt from './assets/icons/default-cover-art.svg';

import styles from './CoverArt.module.scss';

import { Icon } from 'components/icon';

interface Props {
   coverArtLocation?: Path;
   additionalIconStyles?: CSS_Class;
}

export const CoverArt = ({ coverArtLocation, additionalIconStyles }: Props) => {
   return (
      <div
         className={styles.coverArt}
      >
         <Icon
            iconPath={coverArtLocation || defaultCoverArt}
            alt={'Cover Art'}
            customStyles={`
               ${styles.coverArtIcon}
               ${additionalIconStyles}
            `}
         />
      </div>
   );
};
