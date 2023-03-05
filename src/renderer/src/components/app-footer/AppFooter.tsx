import { useIsMediaPlayerOpen } from 'features/media-player';

import { MediaPlayer } from 'features/media-player';

export const AppFooter = () => {
   const { isOpen } = useIsMediaPlayerOpen();

   return (
      <footer>
         { isOpen &&
            <MediaPlayer />
         }
      </footer>
   );
};