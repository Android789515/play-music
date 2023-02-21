import type { MouseEvent } from 'react';

import { MouseButtons } from 'types/eventTypes';
import type { Tab as TabType } from '../../types';

import styles from './Tab.module.scss';

import { useShowContextMenu, ContextMenu } from 'components/context-menu';
import { TabName } from '../tab-name';

interface Props {
   tab: TabType;
   currentTab?: boolean;
   setCurrentTab: (tab: TabType) => void; // Sets state
   closeTab: (tab: TabType) => void; // Sets state
}

export const Tab = ({ tab, currentTab, setCurrentTab, closeTab }: Props) => {
   const { isContextMenuShown, openContextMenu, closeContextMenu } = useShowContextMenu();

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

   const contextMenuStructure = {
      'Rename': () => {}
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
               tabName={tab.name}
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
