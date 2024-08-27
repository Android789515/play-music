import { ReactNode, MouseEvent, type HTMLAttributes } from 'react';

import type { CSS_Class } from 'types/cssTypes';
import { handleAuxClick } from 'utils/handleAuxClick';

import { Button } from 'components/button';
import {
   ContextMenuStructure,
   isContextMenuItemWithEvent,
   ContextMenuItemWithEvent,
   useControlContextMenu,
   ContextMenu
} from 'components/context-menu';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   customStyles?: CSS_Class;
   menuStructure?: ContextMenuStructure;
   children: ReactNode;
}

export const ButtonWithContextMenu = ({ customStyles, menuStructure = [], children, ...rest }: Props) => {
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
         customStyles={customStyles}
         onMouseUp={handleAuxClick({
            onRightClick: setupContextMenu
         })}
         onDoubleClick={mainAction}
         {...rest}
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
