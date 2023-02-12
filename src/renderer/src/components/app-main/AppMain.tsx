import styles from './AppMain.module.scss';

import { AppMainLayout } from './components';
import { LibraryView } from 'features/library-view'
import { Songs } from 'features/songs';

export const AppMain = () => {
   return (
      <main className={styles.appMain}>
         <AppMainLayout>
            <LibraryView />

            <Songs />
         </AppMainLayout>
      </main>
   );
};
