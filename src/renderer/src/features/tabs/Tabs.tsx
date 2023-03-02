import { useTabs } from './api';

import styles from './Tabs.module.scss';

import { List } from 'components/list';
import { Tab } from './components';

export const Tabs = () => {
   const { getTabs } = useTabs();

   const TabComponents = getTabs().map(tab => {
      return ((tab.isOpen || tab.isPermanent) ?
         <Tab
            key={tab.id}
            tab={tab}
            currentTab={tab.isCurrent}
         />
         : null);
   });

   return (
      <List customStyles={styles.tabs}>
         {TabComponents}
      </List>
   );
};
