import type { MouseEvent } from 'react';

import {
   ContextMenuItemWithMenu,
   isContextMenuItemWithMenu,
   isContextMenuItemWithEvent,
   OneOfAnyContextMenuItems
} from '../types';
import type { ShowContextMenuAPI } from '../api';

import styles from './ContextMenuItem.module.scss';

import { ContextMenu } from '../ContextMenu';

interface Props {
   nestedMenuMethods: ShowContextMenuAPI;
   closeOuterMenu: () => void;
   menuItem: OneOfAnyContextMenuItems;
}

export const ContextMenuItem = ({ nestedMenuMethods, closeOuterMenu, menuItem }: Props) => {
   const hasNestedMenu = isContextMenuItemWithMenu(menuItem);
   const nestedMenuStructure = (menuItem as ContextMenuItemWithMenu).menu;

   const {
      isContextMenuShown: isNestedMenuShown,
      openContextMenu: openNestedMenu,
      closeContextMenu: closeNestedMenu,
   } = nestedMenuMethods;

   const handleClick = (event: MouseEvent) => {
      if (isContextMenuItemWithEvent(menuItem)) {
         menuItem.action(event);
         closeOuterMenu();
      } else if (hasNestedMenu) {
         openNestedMenu();
      }
   };

   return (
      <li
         className={styles.contextMenuItem}
         onMouseEnter={hasNestedMenu ? openNestedMenu : closeNestedMenu}
         onClick={handleClick}
      >
         <p className={styles.contextMenuActionName}>
            {menuItem.name}
         </p>

         { hasNestedMenu ? (
            <ContextMenu
               shown={isNestedMenuShown()}
               nested
               menuStructure={nestedMenuStructure}
               closeContextMenu={closeOuterMenu}
            />
         ) : null }
      </li>
   );
};
