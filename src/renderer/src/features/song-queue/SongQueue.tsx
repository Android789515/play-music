import { isEmpty } from '@utils/array'
import { useSongQueue } from './api';

import styles from './SongQueue.module.scss';

import { WidgetFloater } from 'components/widget-floater';
import { ArrowToggle } from 'components/arrow-toggle';

import { SongQueueLayout } from './components/song-queue-layout';
import { SongQueueHeader } from './components/song-queue-header';
import { QueuedSongs } from './components/queued-songs';

export const SongQueue = () => {
   const { songQueue } = useSongQueue();

   const showSongQueue = !isEmpty(songQueue);

   return ( showSongQueue ?
      <WidgetFloater>
         <div className={styles.songQueue}>
            <SongQueueLayout>
               <SongQueueHeader>
                  <ArrowToggle
                     onArrowUp={() => {}}
                     onArrowDown={() => {}}
                  />
               </SongQueueHeader>

               <QueuedSongs
                  songQueue={songQueue}
               />
            </SongQueueLayout>
         </div>
      </WidgetFloater>
   : null );
};
