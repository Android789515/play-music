import { FocusEvent, useRef, useEffect } from 'react';

import type { ContextMenuStructure } from './types';
import { useShowContextMenu } from './api';
import { testConditions } from 'utils/boolean';

import styles from './ContextMenu.module.scss';

import { List } from 'components/list';
import { ContextMenuItem } from './components';

interface Props {
   nested?: boolean;
   menuStructure: ContextMenuStructure;
   closeContextMenu: () => void;
}

export const ContextMenu = ({ nested, menuStructure, closeContextMenu }: Props) => {
   const contextMenuRef = useRef<HTMLDivElement>(null);

   const focusWhenShown = () => {
      const contextMenu = contextMenuRef.current;

      if (contextMenu) {
         contextMenu.focus();
      }
   };

   useEffect(focusWhenShown, []);

   const handleDocumentClick = (event: MouseEvent) => {
      const contextMenu = contextMenuRef.current;
      const eventTarget = event.target as HTMLElement;

      if (testConditions({
         isMounted: () => contextMenu !== undefined,
         clickedOutsideMenu: () => !contextMenu!.contains(eventTarget)
      }).all()) {
         closeContextMenu();
      }
   };

   // Use outside the ContextMenuItems
   const nestedMenuMethods = useShowContextMenu();

   const ContextMenuActions = menuStructure.map((menuItem, index) => {
         return (
            <ContextMenuItem
               key={index}
               nestedMenuMethods={nestedMenuMethods}
               closeOuterMenu={closeContextMenu}
               menuItem={menuItem}
            />
         );
      }
   );

   const isContextMenuEmpty = menuStructure.length === 0;

   return !isContextMenuEmpty ? (
      <div
         tabIndex={1}
         className={`
            ${styles.contextMenu}
            ${nested ? styles.nestedContextMenu : ''}
         `}
         ref={contextMenuRef}
      >
         <List customStyles={styles.contextMenuLayout}>
            {ContextMenuActions}
         </List>
      </div>
   ) : null;
};
