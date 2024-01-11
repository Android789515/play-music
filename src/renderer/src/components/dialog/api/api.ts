import type { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import type { FormID } from 'types/htmlTypes';
import { dialogState } from '../stores';

export const useDialog = () => {
   const [ dialog, setDialog ] = useRecoilState(dialogState);

   const getDialog = () => {
      return dialog;
   };

   const setOpened = (openedOrNot: boolean) => {
      setDialog(prevState => {
         return {
            ...prevState,
            opened: openedOrNot,
         };
      });
   };

   const openDialog = () => setOpened(true);
   const closeDialog = () => setOpened(false);

   const setDialogContent = ({ content, dialogFormID }: { content: ReactNode, dialogFormID?: FormID }) => {
      setDialog(prevState => {
         return {
            ...prevState,
            content,
            dialogFormID,
         };
      });
   };

   return {
      getDialog,
      openDialog,
      closeDialog,
      setDialogContent,
   };
};
