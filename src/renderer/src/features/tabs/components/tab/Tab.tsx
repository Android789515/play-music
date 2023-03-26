import { useEffect, useState } from 'react';

import type { Tab as TabType } from '../../types';
import { useTabs } from 'features/tabs';
import type { ContextMenuStructure } from 'components/context-menu';
import { handleAuxClick } from 'utils/handleAuxClick';

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

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleClick = handleAuxClick({
      onLeftClick: () => setCurrentTab(tab),
      onMiddleClick: () => closeTab(tab),
      onRightClick: () => openContextMenu(),
   });

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
               ${currentTab ? styles.currentTab : ''}
            `}
            onClick={handleClick}
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
