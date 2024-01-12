import type { ReactNode } from 'react';

import type { FormID } from 'types/htmlTypes';

export interface DialogContent {
   content: ReactNode | null;
   dialogFormID: FormID | undefined;
}

export interface DialogHandlers {
   onConfirm: () => void;
   onCancel: () => void;
}

export interface DialogState extends DialogContent {
   opened: boolean;
   handlers?: DialogHandlers;
}

export enum DialogResponses {
   confirm = 'confirm',
   cancel = 'cancel',
}
