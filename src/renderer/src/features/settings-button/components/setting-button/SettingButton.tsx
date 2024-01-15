import type { Setting } from 'features/settings/types';
import { SettingType } from 'features/settings/types';

import { ToggleSwitch } from 'components/toggle-switch';
import { DropDownSelect } from 'components/drop-down-select';

interface Props<ValueType> {
   valueType: ValueType;
   setting: Setting<ValueType>;
   changeSetting: (newValue: ValueType) => void;
}

export const SettingButton = ({ valueType, setting, changeSetting }: Props<typeof valueType>) => {
   const { type, defaultValue, value, options } = setting;

   switch (type) {
      case SettingType.toggle: {
         const [ nonDefaultValue ] = options.filter(option => {
            return option !== defaultValue;
         });

         return (
            <ToggleSwitch
               isToggled={value !== defaultValue}
               text={value}
               onToggle={(nowToggled) => {
                  changeSetting(nowToggled ? nonDefaultValue : defaultValue);
               }}
            />
         );
      }
      
      case SettingType.dropDownSelect: {
         return (
            <DropDownSelect
               valueType={valueType}
               selectedValue={setting.value}
               options={setting.options}
               setSelectedValue={(newValue) => {
                  changeSetting(newValue);
               }}
            />
         );
      }

      default: {
         return null;
      }
   }
};
