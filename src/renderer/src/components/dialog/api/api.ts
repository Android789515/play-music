import { useRecoilState } from 'recoil';

import { DialogContent, dialogState } from '../stores';

export const useDialog = () => {
   const [ dialog, setDialog ] = useRecoilState(dialogState);

   const getDialog = () => {
      return dialog;
   };

   const openDialog = ({ content, dialogFormID }: DialogContent) => {
      setDialog(prevState => {
         return {
            ...prevState,
            content,
            dialogFormID,
         };
      });
   };

   const closeDialog = () => {
      setDialog(prevState => {
         return {
            ...prevState,
            content: null,
            dialogFormID: undefined,
         };
      });
   };

   return {
      getDialog,
      openDialog,
      closeDialog,
   };
};
