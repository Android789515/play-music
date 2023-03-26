import { FocusEvent, useRef, useEffect } from 'react';

import type { ContextMenuLocation, ContextMenuStructure } from './types';
import { useControlContextMenu } from './api';
import { testConditions } from '@utils/boolean';

import styles from './ContextMenu.module.scss';

import { List } from 'components/list';
import { ContextMenuItem } from './components';

interface Props {
   shown?: boolean;
   nested?: boolean;
   location?: ContextMenuLocation;
   menuStructure: ContextMenuStructure;
   closeContextMenu: () => void;
}

export const ContextMenu = ({ shown, nested, location, menuStructure, closeContextMenu }: Props) => {
   const contextMenuRef = useRef<HTMLDivElement>(null);

   const focusWhenShown = () => {
      const contextMenu = contextMenuRef.current;

      if (shown && contextMenu) {
         contextMenu.focus();
      }
   };

   useEffect(focusWhenShown, [ shown ]);

   const closeOnBlur = (event: FocusEvent) => {
      const contextMenu = contextMenuRef.current;
      const focusedTarget = event.relatedTarget as HTMLElement;

      if (testConditions({
         isMounted: () => contextMenu !== undefined,
         focusedOutsideMenu: () => !contextMenu?.contains(focusedTarget),
      }).all()) {
         closeContextMenu();
      }
   };

   // Use outside the ContextMenuItems
   const nestedMenuMethods = useControlContextMenu();

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
   const showContextMenu = shown && !isContextMenuEmpty;

   return (showContextMenu ?
      <div
         tabIndex={1}
         className={`
            ${styles.contextMenu}
            ${nested ? styles.nestedContextMenu : ''}
         `}
         style={{
            top: location?.y,
            left: location?.x,
         }}
         onBlur={closeOnBlur}
         ref={contextMenuRef}
      >
         <List customStyles={styles.contextMenuLayout}>
            {ContextMenuActions}
         </List>
      </div>
      : null);
};
