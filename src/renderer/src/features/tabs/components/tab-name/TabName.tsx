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
   const { updateTab } = useTabs();

   const renameTab = (event: FormEvent) => {
      const updatedTabName = (event.target as HTMLHeadingElement).textContent;

      if (updatedTabName) {
         updateTab(tabID, { tabKey: 'name', data: updatedTabName });
      }
   };

   const tabNameRef = useRef<HTMLHeadingElement>(null);

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
         onChange={renameTab}
         onKeyDown={handleKeyDown}
         onBlur={() => setRenaming(false)}
         ref={tabNameRef}
      >
         {tabName}
      </h2>
   );
};