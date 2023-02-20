import { v4 as newUUID } from 'uuid';

import { useTabs } from 'features/tabs';

import plusIcon from './assets/icons/plus.svg';
import styles from './NewTabButton.module.scss';

import { IconButton } from 'components/icon-button';
import { Structure, useShowContextMenu, ContextMenu } from 'components/context-menu';

export const NewTabButton = () => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } = useShowContextMenu();

   const { openTab } = useTabs();

   const handleClick = () => {
      openContextMenu();
   };

   const openBlankTab = () => {
      const newTab = { id: newUUID(), name: 'New Tab' };

      openTab(newTab);

      closeContextMenu();
   };

   const contextMenuStructure: Structure = {
      'New Tab': () => openBlankTab(),
   };

   return (
      <div>
         <IconButton
            name={'New Tab Button'}
            iconPath={plusIcon}
            buttonStyles={styles.newTabButton}
            iconStyles={styles.plusIcon}
            onClick={handleClick}
         />
         { isContextMenuShown() &&
            <ContextMenu
               structure={contextMenuStructure}
               closeContextMenu={closeContextMenu}
            />
         }
      </div>
   );
};
