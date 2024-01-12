import { ReactNode, ChangeEvent, useEffect } from 'react';

import type { UUID } from '@globalTypes/stringTypes';
import type { CSS_Class } from 'types/cssTypes';
import { useDialog } from '../../api';

interface Props {
   formID: UUID;
   customStyles: CSS_Class;
   children?: ReactNode;
   onConfirm: () => void;
   onCancel: () => void;
}

export const DialogSubmitter = ({ formID, customStyles = '', children, onConfirm, onCancel }: Props) => {
   const { setHandlers } = useDialog();

   useEffect(() => {
      setHandlers({ onConfirm, onCancel });
   }, [ setHandlers, onConfirm, onCancel ]);

   const handleSubmission = (event: ChangeEvent) => {
      event.preventDefault();
   };

   return (
      <form
         id={formID}
         className={customStyles}
         action=''
         method='dialog'
         // @ts-ignore onSubmit is valid.
         onSubmit={handleSubmission}
      >
         {children}
      </form>
   );
};
