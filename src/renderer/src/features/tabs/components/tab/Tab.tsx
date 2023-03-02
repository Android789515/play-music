import { MouseEvent, useCallback, useEffect, useState } from 'react';

import { MouseButtons } from 'types/eventTypes';
import type { Tab as TabType } from '../../types';
import { useTabs } from 'features/tabs';
import type { ContextMenuStructure } from 'components/context-menu';

import styles from './Tab.module.scss';

import { useShowContextMenu, ContextMenu } from 'components/context-menu';
import { TabName } from '../tab-name';

interface Props {
   tab: TabType;
   currentTab?: boolean;
}

export const Tab = ({ tab, currentTab }: Props) => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } = useShowContextMenu();

   const { setCurrentTab, closeTab, deleteTab } = useTabs();

   useEffect(() => {
      setCurrentTab(tab);
   }, [ setCurrentTab, tab ]);

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

   const contextMenuStructure: ContextMenuStructure = [
      ...!tab.isPermanent ? [ {
         name: 'Rename',
         onClick: () => setRenaming(true)
      } ] : [],
      ...!tab.isPermanent ? [ {
         name: 'Delete',
         onClick: () => deleteTab(tab)
      } ] : []
   ];

   return (
      <li>
         <div
            tabIndex={1}
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

         {isContextMenuShown() &&
            <ContextMenu
               menuStructure={contextMenuStructure}
               closeContextMenu={closeContextMenu}
            />
         }
      </li>
   );
};
