import type { MouseEvent } from 'react';

import type { FormID } from 'types/htmlTypes';
import { ButtonTypes } from 'components/button/buttonTypes';

import styles from './DialogButtons.module.scss';

import { CancelButton } from './CancelButton';
import { ConfirmButton } from './ConfirmButton';

interface Props {
   form?: FormID;
   onCancel: (event: MouseEvent) => void;
   onConfirm: (event: MouseEvent) => void;
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
            type={ButtonTypes.submit}
            form={form}
            onClick={onConfirm}
         />
      </div>
   );
};
