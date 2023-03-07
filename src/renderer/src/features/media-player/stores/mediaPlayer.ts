import { atom } from 'recoil';

export const isMediaPlayerOpenState = atom<boolean>({
   key: 'isMediaPlayerOpenState',
   default: false
});