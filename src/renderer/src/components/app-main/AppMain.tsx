import { Toaster } from 'react-hot-toast';

import styles from './AppMain.module.scss';

import { AppMainLayout } from './components';
import { LibraryView } from 'features/library-view';

export const AppMain = () => {
   return (
      <main className={styles.appMain}>
         <AppMainLayout>
            <Toaster
               toastOptions={{
                  className: styles.toaster,
               }}
            />

            <LibraryView />
         </AppMainLayout>
      </main>
   );
};
