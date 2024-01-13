import type { JSXElementConstructor, LazyExoticComponent } from 'react';
import { useRecoilState } from 'recoil';
import Fuse from 'fuse.js';

import type { SearchQuery } from '../../types';
import type { Song } from '@api/types';
import { searchState } from 'components/search-bar/stores';

interface ProvidedProps {
   searchQuery: SearchQuery;
   setSearchQuery: (query: SearchQuery) => void;
   songs: Song[];
}

interface Props {
   collection?: Song[];
   Consumer: JSXElementConstructor<ProvidedProps> | LazyExoticComponent<JSXElementConstructor<ProvidedProps>>
}

export const SearchProvider = ({ collection = [], Consumer }: Props) => {
   const fuse = new Fuse<Song>(collection, {
      keys: [
         'title',
         'artists',
      ],
   });

   const [ searchQuery, setSearchQuery ] = useRecoilState(searchState);

   const provideResults = () => {
      const searchResults = fuse.search(searchQuery);

      const hasSearchResults = searchResults.length;

      if (hasSearchResults) {
         return searchResults.map(result => result.item);
      } else {
         return collection;
      }
   };

   return (
      <Consumer
         searchQuery={searchQuery}
         setSearchQuery={setSearchQuery}
         songs={provideResults()}
      />
   );
};
