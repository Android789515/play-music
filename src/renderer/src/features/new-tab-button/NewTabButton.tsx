import { v4 as newUUID } from 'uuid';

import { useTabs } from 'features/tabs';

import plusIcon from './assets/icons/plus.svg';
import styles from './NewTabButton.module.scss';

import { IconButton } from 'components/icon-button';

export const NewTabButton = () => {
   const { openTab, setCurrentTab } = useTabs();

   const handleClick = () => {
      const newTab = { id: newUUID(), name: 'New Tab' };
      
      openTab(newTab);
      setCurrentTab(newTab);
   };

   return (
      <IconButton
         name={'New Tab Button'}
         iconPath={plusIcon}
         buttonStyles={styles.newTabButton}
         iconStyles={styles.plusIcon}
         onClick={handleClick}
      />
   );
};
