import { useState } from 'react';

import type { ContextMenuLocation } from '../types';

export interface ShowContextMenuAPI {
   isContextMenuShown: () => boolean;
   openContextMenu: () => void;
   closeContextMenu: () => void;
   getContextMenuLocation: () => ContextMenuLocation;
   setContextMenuLocation: (location: ContextMenuLocation) => void;
}

interface ContextMenuControls {
   isShown: boolean;
   location: ContextMenuLocation;
}

export const useControlContextMenu = (): ShowContextMenuAPI => {
   const [ contextMenuControls, updateContextMenuControls ] = useState<ContextMenuControls>({
      isShown: false,
      location: null,
   });

   const isContextMenuShown = () => {
      return contextMenuControls.isShown;
   };

   const openContextMenu = () => {
      updateContextMenuControls(controls => {
         return {
            ...controls,
            isShown: true,
         };
      });
   };

   const closeContextMenu = () => {
      updateContextMenuControls(controls => {
         return {
            ...controls,
            isShown: false,
         };
      });
   };

   const getContextMenuLocation = () => {
      return contextMenuControls.location;
   };

   const setContextMenuLocation = (location: ContextMenuLocation) => {
      updateContextMenuControls(controls => {
         return {
            ...controls,
            location
         };
      });
   };

   return {
      isContextMenuShown,
      openContextMenu,
      closeContextMenu,
      getContextMenuLocation,
      setContextMenuLocation,
   };
};
