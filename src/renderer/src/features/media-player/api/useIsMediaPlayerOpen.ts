import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { isMediaPlayerOpenState } from '../stores/mediaPlayer';

export const useIsMediaPlayerOpen = () => {
   const [ isOpen, setIsOpen ] = useRecoilState(isMediaPlayerOpenState);

   const isOpenMediaPlayerOpen = useCallback(() => isOpen, [ isOpen ]);

   const openMediaPlayer = useCallback(() => {
      setIsOpen(true);
   }, [ setIsOpen ]);

   const closeMediaPlayer = useCallback(() => {
      setIsOpen(false);
   }, [ setIsOpen ]);

   return {
      isOpenMediaPlayerOpen,
      openMediaPlayer,
      closeMediaPlayer,
   };
};