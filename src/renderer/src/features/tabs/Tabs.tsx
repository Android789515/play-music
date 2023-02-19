import { useEffect } from 'react';

import { useTabs } from './api';

import styles from './Tabs.module.scss';

import { List } from 'components/list';
import { Tab } from './components';

export const Tabs = () => {
   const { getTabs, setCurrentTab, closeTab } = useTabs();

   useEffect(() => {
      const onlyOneTab = getTabs().length === 1;

      if (onlyOneTab) {
         setCurrentTab(getTabs()[0]);
      }
   }, [getTabs().length]);

   const TabComponents = getTabs().map(tab => {
      return (
         <Tab
            key={tab.id}
            tab={tab}
            currentTab={tab.isCurrent}
            setCurrentTab={setCurrentTab}
            closeTab={closeTab}
         />
      );
   });

   return (
      <List customStyles={styles.tabs}>
         {TabComponents}
      </List>
   );
};
