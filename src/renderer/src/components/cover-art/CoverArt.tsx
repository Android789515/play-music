import type { HTMLAttributes } from 'react';

import type { Path } from '@globalTypes/fileTypes';
import type { CSS_Class } from 'types/cssTypes';

import defaultCoverArt from './assets/icons/default-cover-art.svg';

import styles from './CoverArt.module.scss';

import { Icon } from 'components/icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
   coverArtLocation?: Path | null;
   additionalIconStyles?: CSS_Class;
}

export const CoverArt = ({ coverArtLocation, additionalIconStyles, ...rest }: Props) => {
   return (
      <div
         className={
            coverArtLocation
               ? styles.coverArt
               : styles.defaultCoverArt
         }
         {...rest}
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
