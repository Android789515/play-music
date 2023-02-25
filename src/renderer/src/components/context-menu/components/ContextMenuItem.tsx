import type { MouseEventHandler } from 'react';

import type { Structure } from '../types';
import type { ShowContextMenuHook } from '../api';
import { useLogValueChange } from 'hooks/useLogValueChange';

import styles from './ContextMenuItem.module.scss';

import { ContextMenu } from '../ContextMenu';

interface Props {
   contextMenuMethods: ShowContextMenuHook;
   actionName: string;
   action: MouseEventHandler | Structure;
}

export const ContextMenuItem = ({ contextMenuMethods, actionName, action }: Props) => {

   const hasNestedMenu = typeof action === 'object';

   const {
      isContextMenuShown: isNestedMenuShown,
      openContextMenu: openNestedMenu,
      closeContextMenu: closeNestedMenu
   } = contextMenuMethods;
   
   useLogValueChange(hasNestedMenu, { message: 'hasNestedMenu: ' + hasNestedMenu });
   useLogValueChange(isNestedMenuShown(), { message: 'isNestedMenuShown(): ' + isNestedMenuShown() });
   
   return (
      <li
         className={styles.contextMenuItem}
         onMouseEnter={hasNestedMenu ? openNestedMenu : closeNestedMenu}
         onClick={hasNestedMenu ? openNestedMenu : action}
      >
         <p className={styles.contextMenuActionName}>
            {actionName}
         </p>

         { (hasNestedMenu && isNestedMenuShown()) ?
            <ContextMenu
               nested
               structure={action}
               closeContextMenu={() => {}}
            />
         : null}
      </li>
   );
};