import type { MouseEvent } from 'react';

import type { FormID } from 'types/htmlTypes';
import { ButtonTypes } from 'components/button/buttonTypes';
import { DialogResponses } from 'components/dialog/types';

import styles from './DialogButtons.module.scss';

import { Button } from 'components/button';

interface Props {
   form?: FormID;
}

export const DialogButtons = ({ form }: Props) => {
   const submitDialogResponse = (event: MouseEvent) => {
      const buttonClicked = event.target as HTMLButtonElement;

      const dialog = buttonClicked.closest('dialog');

      dialog?.close(buttonClicked.value);
   };

   return (
      <div
         className={styles.dialogButtons}
      >
         <Button
            // @ts-ignore value is a
            // valid HTML attribute for buttons.
            value={DialogResponses.cancel}
            form={form}
            onClick={submitDialogResponse}
         >
            Cancel
         </Button>

         <Button
            // @ts-ignore type is a
            // valid HTML attribute for buttons.
            type={ButtonTypes.submit}
            value={DialogResponses.confirm}
            form={form}
            onClick={submitDialogResponse}
         >
            Confirm
         </Button>
      </div>
   );
};
