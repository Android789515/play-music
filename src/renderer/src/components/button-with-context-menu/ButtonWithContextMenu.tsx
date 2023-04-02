import { ReactNode, MouseEvent } from 'react';

import { handleAuxClick } from 'utils/handleAuxClick';

import { Button } from 'components/button';
import {
   ContextMenuStructure,
   isContextMenuItemWithEvent,
   ContextMenuItemWithEvent,
   useControlContextMenu,
   ContextMenu
} from 'components/context-menu';

interface Props {
   menuStructure?: ContextMenuStructure;
   children: ReactNode;
}

export const ButtonWithContextMenu = ({ menuStructure = [], children }: Props) => {
   const {
      isContextMenuShown,
      openContextMenu,
      closeContextMenu,
      getContextMenuLocation,
      setContextMenuLocation,
   } = useControlContextMenu();

   const setupContextMenu = (event: MouseEvent) => {
      setContextMenuLocation({ x: event.clientX, y: event.clientY });

      openContextMenu();
   };

   const doNothing = { action: () => {} };

   const [
      { action: mainAction } = doNothing
   ] = menuStructure.filter(item => (

      isContextMenuItemWithEvent(item)
      && item.isMainAction

   )) as ContextMenuItemWithEvent[];

   return (
      <Button
         onMouseUp={handleAuxClick({
            onRightClick: setupContextMenu
         })}
         onDoubleClick={mainAction}
      >
         {children}

         <ContextMenu
            shown={isContextMenuShown()}
            location={getContextMenuLocation()}
            menuStructure={menuStructure}
            closeContextMenu={closeContextMenu}
         />
      </Button>
   );
};
