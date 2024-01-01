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

   useEffect(() => {
      const contextMenu = contextMenuRef.current;
      if (contextMenu) {
         adjustLocation(contextMenu);
      }
   });

   const closeOnOutsideClick = (event: MouseEvent) => {
      const contextMenu = contextMenuRef.current;
      const clickedTarget = event.target as HTMLElement;

      if (testConditions({
         isMounted: () => contextMenu !== null,
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

   return ( showContextMenu ?
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
      : null );
};

type SideOfMenu = 'left' | 'top';

const shiftIfTooFar = (contextMenu: HTMLDivElement, sideOfMenu: SideOfMenu, distanceFromScreenEdge: number) => {
   const onePixel = 1;

   if (distanceFromScreenEdge < onePixel) {
      const sideOfMenuLocation = parseFloat(contextMenu.style[sideOfMenu]);
      const distancePastScreenEdge = Math.abs(distanceFromScreenEdge);

      contextMenu.style[sideOfMenu] = `${
         sideOfMenuLocation
         - distancePastScreenEdge
      }px`;
   }
};

const adjustLocation = (contextMenu: HTMLDivElement) => {
   const { right, bottom } = contextMenu.getBoundingClientRect();

   const scrollBarWidth = 8;
   shiftIfTooFar(
      contextMenu,
      'left',
      window.innerWidth - right - scrollBarWidth
   );

   shiftIfTooFar(
      contextMenu,
      'top',
      window.innerHeight - bottom
   );
};

