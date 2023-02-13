import styles from './AppFooter.module.scss';

import { AppFooterLayout } from './components';
import { MediaPlayer } from 'features/media-player';

export const AppFooter = () => {
   return (
      <footer className={styles.appFooter}>
         <AppFooterLayout>
            <MediaPlayer />
         </AppFooterLayout>
      </footer>
   );
};
