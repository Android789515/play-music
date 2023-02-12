import styles from './AppHeader.module.scss';

import { AppHeaderLayout } from './components'
import { Tabs } from 'features/tabs';
import { NewTabButton } from 'features/new-tab-button';
import { SettingsButton } from 'features/settings-button';

export const AppHeader = () => {
   return (
      <header className={styles.appHeader}>
         <AppHeaderLayout>
            <Tabs />

            <NewTabButton />

            <SettingsButton />
         </AppHeaderLayout>
      </header>
   );
};
