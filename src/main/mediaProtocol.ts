import type { ProtocolRequest, ProtocolResponse } from 'electron';

type FileProtocolHandler = (request: ProtocolRequest, callback: (response: (string)
   | (ProtocolResponse)) => void) => void;

export const mediaProtocol: FileProtocolHandler = (request, callback) => {
   const url = request.url.replace('media://', '');

   try {
      return callback(decodeURI(url));
   } catch (error) {
      console.error(error);
   }
};