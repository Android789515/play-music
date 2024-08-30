import { type Tab as TabType } from './types';

import styles from './Tabs.module.scss';

import { List } from 'components/list';
import { Tab } from './components';

interface Props {
   tabs: TabType[];
}

export const Tabs = ({ tabs }: Props) => {

   const TabComponents = tabs.map(tab => {
      return ( (tab.isOpen || tab.isPermanent) ?
         <Tab
            key={tab.id}
            tab={tab}
            currentTab={tab.isCurrent}
         />
         : null );
   });

   return (
      <List customStyles={styles.tabs}>
         {TabComponents}
      </List>
   );
};
