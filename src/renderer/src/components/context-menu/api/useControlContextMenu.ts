import { useState } from 'react';

export interface ShowContextMenuAPI {
   isContextMenuShown: () => boolean;
   openContextMenu: () => void;
   closeContextMenu: () => void;
}

export const useControlContextMenu = (): ShowContextMenuAPI => {

   return {
      isContextMenuShown,
      openContextMenu,
      closeContextMenu,
      getContextMenuLocation,
      setContextMenuLocation,
   };
};
