import { v4 as newUUID } from 'uuid';

import { useTabs } from 'features/tabs';

import plusIcon from './assets/icons/plus.svg';
import styles from './NewTabButton.module.scss';

import { IconButton } from 'components/icon-button';
import { Structure, useShowContextMenu, ContextMenu } from 'components/context-menu';

export const NewTabButton = () => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } = useShowContextMenu();

   const { createTab } = useTabs();

   const handleClick = () => {
      openContextMenu();
   };

   const createBlankTab = () => {
      const newTab = { id: newUUID(), name: 'New Tab', collection: [] };

      createTab(newTab);

      closeContextMenu();
   };

   const contextMenuStructure: Structure = {
      'More': {
         'Test': () => {}
      },
      'New Tab': () => createBlankTab(),
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
