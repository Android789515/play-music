import { useTabs } from './api';

import styles from './Tabs.module.scss';

import { List } from 'components/list';
import { Tab } from './components';

export const Tabs = () => {
   const { getTabs } = useTabs();

   const TabComponents = getTabs().map(tab => {
      return (
         <Tab
            key={tab.id}
            tab={tab}
            currentTab={tab.isCurrent}
         />
      );
   });

   return (
      <List customStyles={styles.tabs}>
         {TabComponents}
      </List>
   );
};
