import type { Path } from '@globalTypes/fileTypes';

import defaultCoverArt from './assets/icons/default-cover-art.svg';

interface Props {
   coverArtLocation?: Path;
}

export const CoverArt = ({ coverArtLocation }: Props) => {
   return (
      <img
         src={coverArtLocation || defaultCoverArt}
         alt='Cover art'
      />
   );
};
