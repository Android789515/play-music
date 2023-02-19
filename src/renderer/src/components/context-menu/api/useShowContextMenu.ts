import { useState } from 'react';

export const useShowContextMenu = () => {
   const [ isShown, setIsShown ] = useState(false);

   const isContextMenuShown = () => isShown;

   const openContextMenu = () => {
      setIsShown(true);
   };

   const closeContextMenu = () => {
      setIsShown(false);
   };

   return {
      isContextMenuShown,
      openContextMenu,
      closeContextMenu
   };
};