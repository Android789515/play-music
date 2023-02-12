import styles from './AppHeader.module.scss';

import { AppHeaderLayout } from './components'
import { Tabs } from 'features/tabs';

export const AppHeader = () => {
   return (
      <header className={styles.appHeader}>
         <AppHeaderLayout>
            <Tabs />
         </AppHeaderLayout>
      </header>
   );
};
