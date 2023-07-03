import { useState } from 'react';

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

   const [ isExpanded, setIsExpanded ] = useState(false);

   return ( showSongQueue ?
      <WidgetFloater>
         <div className={`
            ${styles.songQueue}
            ${isExpanded ? styles.songQueueExpanded : ''}
         `}>
            <SongQueueLayout>
               <SongQueueHeader>
                  <ArrowToggle
                     onArrowUp={() => setIsExpanded(true)}
                     onArrowDown={() => setIsExpanded(false)}
                  />
               </SongQueueHeader>

               { isExpanded ?
                  <QueuedSongs
                     songQueue={songQueue}
                  />
               : null }
            </SongQueueLayout>
         </div>
      </WidgetFloater>
   : null );
};
