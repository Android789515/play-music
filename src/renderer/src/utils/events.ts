import type { KeyboardEvent } from 'react';

type Key = string;

export const wereKeysPressed = ({ key: keyPressed }: KeyboardEvent, keys: Key[]) => {
   return keys.some(key => key === keyPressed);
};