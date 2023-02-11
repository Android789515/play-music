import styles from './App.module.scss';

import { AppHeader } from 'components/app-header';
import { AppMain } from 'components/app-main';

export const App = () => {
   return (
      <div className={styles.app}>
         <AppHeader />

         <AppMain />
      </div>
   );
};
