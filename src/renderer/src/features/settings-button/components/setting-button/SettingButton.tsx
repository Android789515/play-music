import type { Setting } from 'features/settings/types';
import { SettingType } from 'features/settings/types';

import { ToggleSwitch } from 'components/toggle-switch';

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

      default: {
         return null;
      }
   }
};
