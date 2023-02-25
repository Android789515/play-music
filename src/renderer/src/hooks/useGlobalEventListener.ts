import { useEffect } from 'react';

type Handler = (event: Event | any) => void;

export const useGlobalEventListener = (eventName: string, eventHandler: Handler, condition?: boolean) => {
   useEffect(() => {
      if (condition === undefined || condition) {
         document.body.addEventListener(eventName, eventHandler);
      }

      return () => {
         document.body.removeEventListener(eventName, eventHandler);
      };
   });
};