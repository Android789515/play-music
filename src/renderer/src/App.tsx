import styles from './App.module.scss';

import { AppHeader } from 'components/app-header';
import { AppMain } from 'components/app-main';
import { AppFooter } from 'components/app-footer';

export const App = () => {
   return (
      <div className={styles.app}>
         <AppHeader />

         <AppMain />

         <AppFooter />
      </div>
   );
};
