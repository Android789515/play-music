import styles from './Tabs.module.scss';

import { Tab } from './components';

export const Tabs = () => {
   return (
      <ul className={styles.tabs}>
         <Tab currentTab tabText={'Library'} />

         <Tab tabText={'Classic Rock'} />
      </ul>
   );
};
