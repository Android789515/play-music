import { LibraryViewTopBar } from './components/library-view-top-bar';
import { Songs } from './songs';

export const LibraryView = () => {
   return (
      <div>
         <LibraryViewTopBar />

         <Songs />
      </div>
   );
};
