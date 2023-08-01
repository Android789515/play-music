import type { ReactNode } from 'react';
import { SetterOrUpdater } from 'recoil';

import { DialogState } from './stores';

const setOpened = (openedOrNot: boolean) => {
   return (setDialogState: SetterOrUpdater<DialogState>) => {
      setDialogState(prevState => {
         return {
            ...prevState,
            opened: openedOrNot,
         };
      });
   };
};

export const openDialog = setOpened(true);
export const closeDialog = setOpened(false);

export const setDialogContent = (content: ReactNode) => {
   return (setDialogState: SetterOrUpdater<DialogState>) => {
      setDialogState(prevState => {
         return {
            ...prevState,
            content
         };
      });
   };
};
