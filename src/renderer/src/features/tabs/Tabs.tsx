import styles from './Tabs.module.scss';

import { List } from 'components/list';
import { Tab } from './components';

export const Tabs = () => {
   return (
      <List customStyles={styles.tabs}>
         <Tab currentTab tabText={'Library'} />

         <Tab tabText={'Classic Rock'} />
      </List>
   );
};
