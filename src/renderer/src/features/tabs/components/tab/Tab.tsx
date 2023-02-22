import { MouseEvent, useState } from 'react';

import { MouseButtons } from 'types/eventTypes';
import type { Tab as TabType } from '../../types';
import { useTabs } from 'features/tabs';

import styles from './Tab.module.scss';

import { useShowContextMenu, ContextMenu } from 'components/context-menu';
import { TabName } from '../tab-name';

interface Props {
   tab: TabType;
   currentTab?: boolean;
}

export const Tab = ({ tab, currentTab }: Props) => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } = useShowContextMenu();

   const { setCurrentTab, closeTab } = useTabs();

   const handleClick = (event: MouseEvent) => {
      switch (event.button) {
         case MouseButtons.left:
            setCurrentTab(tab);
            break;
         
         case MouseButtons.middle:
            closeTab(tab);
            break;
         
         case MouseButtons.right:
            openContextMenu();
            break;
         
         default:
            break;
      }
   };

   const [ renaming, setRenaming ] = useState(false);

   const contextMenuStructure = {
      ...!tab.isPermanent && { 'Rename': () => setRenaming(true) }
   };

   return (
      <li>
         <div
            className={`
               ${styles.tab}
               ${currentTab ? styles.currentTab : ''}
            `}
            onMouseUp={handleClick}
         >
            <TabName
               tabID={tab.id}
               tabName={tab.name}
               renaming={renaming}
               setRenaming={setRenaming}
            />
         </div>

         { isContextMenuShown() &&
            <ContextMenu
               structure={contextMenuStructure}
               closeContextMenu={closeContextMenu}
            />
         }
      </li>
   );
};
