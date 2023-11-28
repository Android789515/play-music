import { useRecoilState } from 'recoil';
import { useDeferredValue } from 'react';

import { dialogState } from './stores';
import { closeDialog } from './api';

import defaultStyles from './Dialog.module.scss';

import { DialogButtons } from './components/dialog-buttons';

export const Dialog = () => {
   const [{ opened, content, dialogFormID }, updateDialog] = useRecoilState(dialogState);

   const isOpenedAfterRendering = useDeferredValue(opened);
   return ( isOpenedAfterRendering ?
      <dialog
         className={`
            ${defaultStyles.dialog}
         `}
         open={isOpenedAfterRendering}
      >
         {content}

         <DialogButtons
            form={dialogFormID}
            onCancel={unusedEvent => {
               closeDialog(updateDialog);
            }}
            onConfirm={unusedEvent => {
               closeDialog(updateDialog);
            }}
         />
      </dialog>
      : null );
};
