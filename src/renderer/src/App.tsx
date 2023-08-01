import { RecoilRoot } from 'recoil';

import styles from './App.module.scss';

import { AppHeader } from 'components/app-header';
import { AppMain } from 'components/app-main';
import { SongQueue } from 'features/song-queue';
import { MediaPlayer } from 'features/media-player';

import { Dialog } from 'components/dialog';

export const App = () => {
   return (
      <RecoilRoot>
         <div className={styles.app}>
            <AppHeader />

            <AppMain />

            <SongQueue />

            <Dialog />

            <MediaPlayer />
         </div>
      </RecoilRoot>
   );
};
