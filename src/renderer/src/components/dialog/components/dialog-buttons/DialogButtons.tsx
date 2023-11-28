import type { FormID } from 'types/htmlTypes';
import styles from './DialogButtons.module.scss';

import { CancelButton } from './CancelButton';
import { ConfirmButton } from './ConfirmButton';

interface Props {
   form?: FormID;
}

export const DialogButtons = ({ form, onCancel, onConfirm }: Props) => {
   return (
      <div
         className={styles.dialogButtons}
      >
         <CancelButton
            form={form}
            onClick={onCancel}
         />

         <ConfirmButton
            form={form}
            onClick={onConfirm}
         />
      </div>
   );
};
