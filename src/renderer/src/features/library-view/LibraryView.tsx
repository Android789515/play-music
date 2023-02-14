import { LibraryViewTopBar } from './components/library-view-top-bar';
import { Songs } from 'features/songs';

export const LibraryView = () => {
   return (
      <div>
         <LibraryViewTopBar />

         <Songs />
      </div>
   );
};
