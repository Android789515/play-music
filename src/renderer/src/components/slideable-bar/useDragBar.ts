import { useState } from 'react';

export const useDragBar = () => {
   const [ isDragging, setIsDragging ] = useState(false);

   const enableDragging = () => setIsDragging(true);

   const disableDragging = () => setIsDragging(false);

   return {
      isDragging,
      enableDragging,
      disableDragging
   };
};