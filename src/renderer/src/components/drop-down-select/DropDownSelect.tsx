import type { ChangeEvent } from 'react';

import styles from './DropDownSelect.module.scss';

interface Props<ValueType> {
   valueType: ValueType;
   selectedValue: ValueType;
   options: ValueType[];
   setSelectedValue: (newValue: ValueType) => void;
}

export const DropDownSelect = ({ valueType, selectedValue, options, setSelectedValue }: Props<typeof valueType>) => {
   const onSelect = (event: ChangeEvent) => {
      const selectBox = event.target as HTMLSelectElement;

      const selectedOption = selectBox.value;

      setSelectedValue(selectedOption);
   };

   const OptionComponents = options.map((option, index) => {
      return (
         <option
            key={index}
            value={option}
         >
            {option}
         </option>
      );
   });
   
   return (
      <select
         className={styles.dropDownSelect}
         value={selectedValue}
         onChange={onSelect}
      >
         {OptionComponents}
      </select>
   );
};
