import { useRef, useEffect } from 'react';

import type { Structure } from './types';

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
      if (contextMenuRef.current) {
         contextMenuRef.current.focus();
      }
   };

   useEffect(focusWhenShown, []);

   const ContextMenuActions = Object.entries(structure).map(([ actionName, action ], index) => {
      return (
         <ContextMenuItem
            key={index}
            itemText={actionName}
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