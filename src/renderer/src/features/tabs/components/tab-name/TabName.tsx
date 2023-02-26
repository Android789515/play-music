import type { Dispatch, SetStateAction, KeyboardEvent, FormEvent } from 'react';
import { useRef, useEffect } from 'react';

import type { UUID } from 'types/stringTypes';
import { wereKeysPressed } from 'utils/events';
import { useTabs } from '../../api';

import styles from './TabName.module.scss';

interface Props {
   tabID: UUID;
   tabName: string;
   renaming: boolean;
   setRenaming: Dispatch<SetStateAction<boolean>>;
}

export const TabName = ({ tabID, tabName, renaming, setRenaming }: Props) => {
   const { updateTab, getTab } = useTabs();

   const tabNameRef = useRef<HTMLHeadingElement>(null);

   const renameTab = (event: FormEvent) => {
      const thisTab = getTab(tabID);
      const updatedTabName = (event.target as HTMLHeadingElement).textContent;

      if (updatedTabName && thisTab) {
         updateTab(thisTab, { tabKey: 'name', data: updatedTabName });
      }
   };

   const handleKeyDown = (event: KeyboardEvent) => {
      if (wereKeysPressed(event, [ 'Enter', 'Escape' ])) {
         const element = tabNameRef.current;

         element?.blur();
      }
   };

   const focusOnRename = () => {
      if (renaming) {
         const element = tabNameRef.current;

         element?.focus();
         
         selectAllText(element);
      }
   };

   useEffect(focusOnRename, [renaming]);

   return (
      <h2
         tabIndex={1}
         className={`
            ${styles.tabName}
            ${renaming ? styles.tabNameRenaming : ''}
         `}
         contentEditable={renaming}
         suppressContentEditableWarning
         onChange={renameTab}
         onKeyDown={handleKeyDown}
         onBlur={() => setRenaming(false)}
         ref={tabNameRef}
      >
         {tabName}
      </h2>
   );
};