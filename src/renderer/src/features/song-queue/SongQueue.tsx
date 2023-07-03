import { useState } from 'react';

import { isEmpty } from '@utils/array'
import { useSongQueue } from './api';

import styles from './SongQueue.module.scss';

import { WidgetFloater } from 'components/widget-floater';
import { ArrowToggle } from 'components/arrow-toggle';
import { PinButton } from './components/pin-button';

import { SongQueueLayout } from './components/song-queue-layout';
import { SongQueueHeader } from './components/song-queue-header';
import { QueuedSongs } from './components/queued-songs';

export const SongQueue = () => {
   const { songQueue } = useSongQueue();

   const showSongQueue = !isEmpty(songQueue);

   const [ isExpanded, setIsExpanded ] = useState(false);
   
   const [ isPinned, setIsPinned ] = useState(false);

   const renderIfExpanded = (Component: JSX.Element) => {
      return ( isExpanded
         ? Component
         : null
      );
   };

   return ( showSongQueue ?
      <WidgetFloater>
         <div className={`
            ${styles.songQueue}
            ${isExpanded ? styles.songQueueExpanded : ''}
            ${isPinned ? styles.songQueuePinned : ''}
         `}>
            <SongQueueLayout>
               <SongQueueHeader>
                  {renderIfExpanded(
                     <PinButton
                        isPinned={isPinned}
                        togglePinned={() => setIsPinned(isPinned => !isPinned)}
                     />
                  )}

                  <ArrowToggle
                     isToggled={isExpanded}
                     onToggle={() => setIsExpanded(isExpanded => !isExpanded)}
                  />
               </SongQueueHeader>

               {renderIfExpanded(
                  <QueuedSongs
                     songQueue={songQueue}
                  />
               )}
            </SongQueueLayout>
         </div>
      </WidgetFloater>
   : null );
};
