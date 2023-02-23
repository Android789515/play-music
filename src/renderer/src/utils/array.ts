import type { UUID } from 'types/stringTypes';

interface ItemWithID {
   id: UUID;
}

export const updateInArray = <Type extends ItemWithID>(array: Type[], itemWithID: Type) => {
   return array.map(item => {
      const isItemToUpdate = item.id === itemWithID.id;
      
      if (isItemToUpdate) {
         return { ...itemWithID };
      }

      return item;
   });
};