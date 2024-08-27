import { atom } from 'recoil';
import { v4 as newUUID } from 'uuid';

export const audioKey = 'audio' + newUUID();

export const audioDataState = atom({
   key: audioKey,
   default: {
      buffer: {
         length: 0,
         data: new Uint8Array(),
      },
   },
});
