import { useDeferredValue } from 'react';

import { useDialog } from './api';

import defaultStyles from './Dialog.module.scss';

import { DialogButtons } from './components/dialog-buttons';

export const Dialog = () => {
   const { getDialog, closeDialog } = useDialog();

   const { opened, content, dialogFormID } = getDialog();

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
               closeDialog();
            }}
            onConfirm={unusedEvent => {
               closeDialog();
            }}
         />
      </dialog>
      : null );
};
