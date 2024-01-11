import { atom } from 'recoil';

import type { DialogState } from '../types';

export const dialogState = atom<DialogState>({
   key: 'dialog',
   default: {
      opened: false,
      content: null,
      dialogFormID: undefined,
   },
});
