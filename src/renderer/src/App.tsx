import { RecoilRoot } from 'recoil';

import styles from './App.module.scss';

import { AppHeader } from 'components/app-header';
import { AppMain } from 'components/app-main';
import { SongQueue } from 'features/song-queue';
import { MediaPlayer } from 'features/media-player';

export const App = () => {
   return (
      <RecoilRoot>
         <div className={styles.app}>
            <AppHeader />

            <AppMain />

            <SongQueue />

            <MediaPlayer />
         </div>
      </RecoilRoot>
   );
};
