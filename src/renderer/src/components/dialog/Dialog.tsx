import { useRecoilState } from 'recoil';

import { dialogState } from './stores';
import { closeDialog } from './api';

import defaultStyles from './Dialog.module.scss';

import { DialogButtons } from './components/dialog-buttons';

export const Dialog = () => {
   const [{ opened, content, dialogFormID }, updateDialog] = useRecoilState(dialogState);

   return (opened ?
      <dialog
         className={`
            ${defaultStyles.dialog}
         `}
         open={opened}
      >
         {content}

         <DialogButtons
            form={dialogFormID}
            onCancel={() => {
               closeDialog(updateDialog);
            }}
            onConfirm={() => {
               closeDialog(updateDialog);
            }}
         />
      </dialog>
      : null);
};
