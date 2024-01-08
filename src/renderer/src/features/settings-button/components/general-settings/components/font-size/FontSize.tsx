import type { FormEvent } from 'react';

import type { FontSizeInPx } from 'types/cssTypes';

import styles from './FontSize.module.scss';

interface Props {
   fontSize: FontSizeInPx;
   setFontSize: (newFontSize: FontSizeInPx) => void;
}

export const FontSize = ({ fontSize, setFontSize }: Props) => {
   const onFontSizeSelect = (event: FormEvent) => {
      const selectedOption = event.target as HTMLOptionElement;

      const newFontSize = selectedOption.value as FontSizeInPx;

      setFontSize(newFontSize);
   };

   return (
      <select
         value={fontSize}
         onChange={onFontSizeSelect}
      >
         <option>
            16px
         </option>

         <option>
            32px
         </option>
      </select>
   );
};
