import type { ReactNode } from 'react';
import { atom } from 'recoil';

export interface DialogState {
   opened: boolean;
   content: ReactNode | null;
}

export const dialogState = atom<DialogState>({
   key: 'dialog',
   default: {
      opened: false,
      content: null,
   },
});
