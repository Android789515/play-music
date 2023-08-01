import styles from './DialogButtons.module.scss';

import { CancelButton } from './CancelButton';
import { ConfirmButton } from './ConfirmButton';

interface Props {
   onCancel: () => void;
   onConfirm: () => void;
}

export const DialogButtons = ({ onCancel, onConfirm }: Props) => {
   return (
      <div
         className={styles.dialogButtons}
      >
         <CancelButton
            onClick={onCancel}
         />

         <ConfirmButton
            onClick={onConfirm}
         />
      </div>
   );
};
