import { ReactNode, MouseEvent } from 'react';

import { handleAuxClick } from 'utils/handleAuxClick';

import styles from './SongButton.module.scss';

import { Button } from 'components/button';
import {
   ContextMenuStructure,
   isContextMenuItemWithEvent,
   ContextMenuItemWithEvent,
   useControlContextMenu,
   ContextMenu
} from 'components/context-menu';

interface Props {
   contextMenu?: ContextMenuStructure;
   children: ReactNode;
}

export const SongButton = ({ contextMenu = [], children }: Props) => {
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

   const [ { action: mainAction } ] = contextMenu.filter(item => (

      isContextMenuItemWithEvent(item)
      && item.isMainAction

   )) as ContextMenuItemWithEvent[];

   const doNothing = () => {};

   return (
      <Button
         customStyles={styles.songButton}
         onMouseUp={handleAuxClick({
            onRightClick: setupContextMenu
         })}
         onDoubleClick={(mainAction || doNothing)}
      >
         {children}

         <ContextMenu
            shown={isContextMenuShown()}
            location={getContextMenuLocation()}
            menuStructure={contextMenu}
            closeContextMenu={closeContextMenu}
         />
      </Button>
   );
};
