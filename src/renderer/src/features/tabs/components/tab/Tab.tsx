import { useState } from 'react';

import type { Tab as TabType } from '../../types';
import { useTabs } from 'features/tabs';
import type { ContextMenuStructure } from 'components/context-menu';
import { handleAuxClick } from 'utils/handleAuxClick';

import styles from './Tab.module.scss';

import { useControlContextMenu, ContextMenu } from 'components/context-menu';
import { TabName } from '../tab-name';

interface Props {
   tab: TabType;
   isCurrentTab?: boolean;
}

export const Tab = ({ tab, isCurrentTab }: Props) => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } = useControlContextMenu();

   const { setCurrentTab, closeTab, deleteTab } = useTabs();

   const [ renaming, setRenaming ] = useState(false);

   const contextMenuStructure: ContextMenuStructure = [
      ...!tab.isPermanent ? [ {
         name: 'Rename',
         action: () => setRenaming(true)
      } ] : [],
      ...!tab.isPermanent ? [ {
         name: 'Delete',
         action: () => deleteTab(tab)
      } ] : []
   ];

   return (
      <li>
         <div
            tabIndex={1}
            className={`
               ${styles.tab}
               ${isCurrentTab ? styles.currentTab : ''}
            `}
            onMouseUp={handleAuxClick({
               onLeftClick: () => setCurrentTab(tab.id),
               onMiddleClick: () => closeTab(tab),
               onRightClick: openContextMenu,
            })}
         >
            <TabName
               tabID={tab.id}
               tabName={tab.name}
               renaming={renaming}
               setRenaming={setRenaming}
            />
         </div>

         <ContextMenu
            shown={isContextMenuShown()}
            menuStructure={contextMenuStructure}
            closeContextMenu={closeContextMenu}
         />
      </li>
   );
};
