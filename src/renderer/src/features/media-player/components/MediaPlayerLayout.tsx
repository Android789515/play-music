import type { ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

export const MediaPlayerLayout = ({ children }: Props) => {
   return (
      <div>
         {children}
      </div>
   );
};
