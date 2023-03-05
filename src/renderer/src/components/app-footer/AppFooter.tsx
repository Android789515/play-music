import { useIsMediaPlayerOpen } from 'features/media-player';

import { MediaPlayer } from 'features/media-player';

export const AppFooter = () => {
   const { isOpenMediaPlayerOpen } = useIsMediaPlayerOpen();

   return (
      <footer>
         { isOpenMediaPlayerOpen() &&
            <MediaPlayer />
         }
      </footer>
   );
};