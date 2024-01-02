import type { Path } from '@globalTypes/fileTypes';
import type { CSS_Class } from 'types/cssTypes';

import defaultCoverArt from './assets/icons/default-cover-art.svg';

import styles from './CoverArt.module.scss';

import { Icon } from 'components/icon';

interface Props {
   coverArtLocation?: Path | null;
   additionalIconStyles?: CSS_Class;
}

export const CoverArt = ({ coverArtLocation, additionalIconStyles }: Props) => {
   return (
      <div
         className={
            coverArtLocation
               ? styles.coverArt
               : styles.defaultCoverArt
         }
      >
         <Icon
            iconPath={coverArtLocation || defaultCoverArt}
            alt={'Cover Art'}
            customStyles={`
               ${
                  coverArtLocation
                     ? styles.coverArtIcon
                     : styles.defaultCoverArtIcon
               }
               ${additionalIconStyles}
            `}
         />
      </div>
   );
};
