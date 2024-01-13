import { atom } from 'recoil';

import type { SearchQuery } from '../types';

const keys = {
   searchState: 'searchState',
};

export const searchState = atom<SearchQuery>({
   key: keys.searchState,
   default: '',
});
