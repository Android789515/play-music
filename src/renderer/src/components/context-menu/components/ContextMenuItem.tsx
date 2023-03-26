import type { MouseEvent } from 'react';

import type {
   ContextMenuItemWithMenu,
   OneOfAnyContextMenuItems
} from '../types';
import { isContextMenuItemWithMenu, isContextMenuItemWithEvent } from '../utils/typeValidators';
import type { ShowContextMenuHook } from '../api';

import styles from './ContextMenuItem.module.scss';

import { ContextMenu } from '../ContextMenu';

interface Props {
   nestedMenuMethods: ShowContextMenuHook;
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

         {hasNestedMenu && isNestedMenuShown() ? (
            <ContextMenu
               nested
               menuStructure={nestedMenuStructure}
               closeContextMenu={closeOuterMenu}
            />
         ) : null}
      </li>
   );
};
