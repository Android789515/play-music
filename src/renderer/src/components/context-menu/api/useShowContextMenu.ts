import { useState } from 'react';

export interface ShowContextMenuHook {
   isContextMenuShown: () => boolean;
   openContextMenu: () => void;
   closeContextMenu: () => void;
}

export const useShowContextMenu = (): ShowContextMenuHook => {
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