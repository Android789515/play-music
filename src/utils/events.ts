import type { KeyboardEvent } from 'react';

type Key = string;

export const wereKeysPressed = ({ key: keyPressed }: KeyboardEvent, keys: Key[]) => {
   return keys.some(key => key === keyPressed);
};

export const selectAllText = (element: HTMLElement | null) => {
   const selection = window.getSelection();
   const range = document.createRange();

   if (element) {
      range.selectNodeContents(element);

      selection?.removeAllRanges();
      selection?.addRange(range);
   }
};