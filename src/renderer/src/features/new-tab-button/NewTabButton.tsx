import { v4 as newUUID } from 'uuid';
import { useRecoilValue } from 'recoil';

import { isEmpty } from '@utils/array';
import { closedTabs } from 'features/tabs/stores';
import { useTabs } from 'features/tabs';

import plusIcon from './assets/icons/plus.svg';
import styles from './NewTabButton.module.scss';

import { IconButton } from 'components/icon-button';
import {
   ContextMenuStructure,
   useShowContextMenu,
   ContextMenu,
} from 'components/context-menu';

export const NewTabButton = () => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } =
      useShowContextMenu();

   const { createTab, openTab } = useTabs();

   const handleClick = () => {
      openContextMenu();
   };

   const createBlankTab = () => {
      const newTab = { id: newUUID(), name: 'New Tab', collection: [] };

      createTab(newTab);
   };

   const closedTabEntries: ContextMenuStructure = [ ...useRecoilValue(closedTabs) ].map(tab => {
      return {
         name: tab.name,
         action: () => openTab(tab)
      };
   });

   const contextMenuStructure: ContextMenuStructure = [
      ...!isEmpty(closedTabEntries) ? [
         {
            name: 'Tabs',
            menu: closedTabEntries
         }
      ] : [],
      {
         name: 'New Tab',
         action: createBlankTab
      }
   ];

   return (
      <div>
         <IconButton
            name={'New Tab Button'}
            iconPath={plusIcon}
            buttonStyles={styles.newTabButton}
            iconStyles={styles.plusIcon}
            onClick={handleClick}
         />

            <ContextMenu
            shown={isContextMenuShown()}
               menuStructure={contextMenuStructure}
               closeContextMenu={closeContextMenu}
            />
      </div>
   );
};
