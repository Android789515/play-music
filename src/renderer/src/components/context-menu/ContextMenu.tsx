import { RefObject, useEffect } from 'react';

import type { Structure } from './types';

import styles from './ContextMenu.module.scss';

import { List } from 'components/list';
import { ContextMenuItem } from './components';

interface Props {
   structure: Structure;
   closeContextMenu: () => void;
   contextMenuRef: RefObject<HTMLDivElement>;
}

export const ContextMenu = ({ structure, closeContextMenu, contextMenuRef }: Props) => {
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

   return (
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
   );
};