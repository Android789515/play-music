import type { ReactNode } from 'react';
import { atom } from 'recoil';

import type { FormID } from 'types/htmlTypes';

export interface DialogState {
   opened: boolean;
   content: ReactNode | null;
   dialogFormID: FormID | undefined;
}

export const dialogState = atom<DialogState>({
   key: 'dialog',
   default: {
      opened: false,
      content: null,
      dialogFormID: undefined,
   },
});
