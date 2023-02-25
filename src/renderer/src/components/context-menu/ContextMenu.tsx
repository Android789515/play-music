import { useRef, useEffect } from 'react';

import type { Structure } from './types';
import { testConditions } from 'utils/boolean';
import { useGlobalEventListener } from 'hooks/useGlobalEventListener';

import styles from './ContextMenu.module.scss';

import { List } from 'components/list';
import { ContextMenuItem } from './components';

interface Props {
   structure: Structure;
   closeContextMenu: () => void;
}

export const ContextMenu = ({ structure, closeContextMenu }: Props) => {
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

   useGlobalEventListener('mousedown', handleDocumentClick);

   const ContextMenuActions = Object.entries(structure).map(([ actionName, action ], index) => {
      return (
         <ContextMenuItem
            key={index}
            actionName={actionName}
            action={action}
         />
      );
   });

   const isContextMenuEmpty = Object.keys(structure).length === 0;

   return ( !isContextMenuEmpty ?
      <div
         tabIndex={1}
         className={styles.contextMenu}
         onBlur={closeContextMenu}
         ref={contextMenuRef}
      >
         <List customStyles={styles.contextMenuLayout}>
            {ContextMenuActions}
         </List>
      </div>
   : null );
};