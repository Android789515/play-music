import { SyntheticEvent, useDeferredValue } from 'react';

import { DialogResponses } from './types';
import { useDialog } from './api';

import styles from './Dialog.module.scss';

import { DialogButtons } from './components/dialog-buttons';

export const Dialog = () => {
   const { getDialog, closeDialog } = useDialog();

   const { opened, content, dialogFormID, handlers } = getDialog();

   const handleClose = (event: SyntheticEvent<HTMLDialogElement>) => {
      if (handlers) {
         const { onConfirm, onCancel } = handlers;

         const dialog = event.target as HTMLDialogElement;

         const response = dialog.returnValue;

         switch (response) {
            case DialogResponses.confirm:
               onConfirm();
               break;

            case DialogResponses.cancel:
               onCancel();
               break;

            default:
               break;
         }
      }

      closeDialog();
   };

   const deferOpened = useDeferredValue(opened);
   return ( deferOpened ?
      <dialog
         className={styles.dialog}
         open={deferOpened}
         onClose={handleClose}
      >
         {content}

         <DialogButtons
            form={dialogFormID}
         />
      </dialog>
      : null );
};
