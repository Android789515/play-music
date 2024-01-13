import type { JSXElementConstructor } from 'react';
import { useRecoilState } from 'recoil';
import Fuse, { FuseResult } from 'fuse.js';

import type { SearchQuery } from '../../types';
import type { Song } from '@api/types';
import { searchState } from 'components/search-bar/stores';

interface ProvidedProps {
   searchQuery: SearchQuery;
   setSearchQuery: (query: SearchQuery) => void;
   searchResults: FuseResult<Song>[];
}

interface Props {
   Consumer: JSXElementConstructor<ProvidedProps>
}

export const SearchProvider = ({ Consumer }: Props) => {
   const fuse = new Fuse<Song>([], {
      keys: [
         'title',
         'artists',
      ],
   });

   const [ searchQuery, setSearchQuery ] = useRecoilState(searchState);

   return (
      <Consumer
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         searchResults={fuse.search(searchQuery)}
      />
   );
};
