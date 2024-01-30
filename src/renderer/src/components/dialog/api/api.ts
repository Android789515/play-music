import { useRecoilState } from 'recoil';
import { useCallback } from 'react';

import type { DialogContent, DialogHandlers } from '../types';
import { dialogState } from '../stores';

export const useDialog = () => {
   const [ dialog, setDialog ] = useRecoilState(dialogState);

   const getDialog = () => {
      return dialog;
   };

   const openDialog = ({ content, dialogFormID }: DialogContent) => {
      setDialog(prevState => {
         return {
            ...prevState,
            opened: true,
            content,
            dialogFormID,
         };
      });
   };

   const closeDialog = () => {
      setDialog(prevState => {
         return {
            ...prevState,
            opened: false,
            content: null,
            dialogFormID: undefined,
         };
      });
   };

   const clearHandlers = useCallback(() => {
      setDialog(prevState => {
         return {
            ...prevState,
            handlers: undefined,
         };
      });
   }, [ setDialog ]);

   const setHandlers = useCallback((handlers: DialogHandlers) => {
      setDialog(prevState => {
         return {
            ...prevState,
            handlers,
         };
      });
   }, [ setDialog ]);

   return {
      getDialog,
      openDialog,
      closeDialog,
      setHandlers,
      clearHandlers,
   };
};
