import { useRef, useEffect } from 'react';

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

   const closeOnOutsideClick = (event: MouseEvent) => {
      const contextMenu = contextMenuRef.current;
      const clickedTarget = event.target as HTMLElement;

      if (testConditions({
         isMounted: () => contextMenu !== undefined,
         clickedOutsideMenu: () => !contextMenu?.contains(clickedTarget),
      }).all()) {
         closeContextMenu();
      }
   };

   useEffect(() => {
      document.body.addEventListener('mousedown', closeOnOutsideClick);

      return () => {
         document.body.removeEventListener('mousedown', closeOnOutsideClick);
      };
      
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
         ref={contextMenuRef}
      >
         <List customStyles={styles.contextMenuLayout}>
            {ContextMenuActions}
         </List>
      </div>
      : null);
};
