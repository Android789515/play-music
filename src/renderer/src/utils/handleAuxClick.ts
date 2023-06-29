import { MouseEventHandler, MouseEvent } from 'react';

import { MouseButtons } from 'types/eventTypes';

interface AuxClickHandlers {
   onLeftClick?: MouseEventHandler,
   onMiddleClick?: MouseEventHandler,
   onRightClick?: MouseEventHandler,
}

const defaultHandler = () => {};

export const handleAuxClick = ({
   onLeftClick = defaultHandler,
   onMiddleClick = defaultHandler,
   onRightClick = defaultHandler,
}: AuxClickHandlers) => {

   return (event: MouseEvent) => {
      switch (event.button) {
         case MouseButtons.left:
            onLeftClick(event);
            break;

         case MouseButtons.middle:
            onMiddleClick(event);
            break;

         case MouseButtons.right:
            onRightClick(event);
            break;

         default:
            break;
      }
   };
};
