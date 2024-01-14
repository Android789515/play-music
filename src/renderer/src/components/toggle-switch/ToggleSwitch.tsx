import styles from './ToggleSwitch.module.scss';

import { Button } from 'components/button';

interface Props {
   isToggled: boolean;
   text?: string;
   onToggle: (isToggled: boolean) => void;
}

export const ToggleSwitch = ({ isToggled, text, onToggle }: Props) => {
   const toggle = () => {
      onToggle(!isToggled);
   };

   const toggleSwitchText = (showText: boolean) => {
      if (showText) {
         return (
            <span className={styles.toggleSwitchText}>
               {text}
            </span>
         );
      } else {
         return null;
      }
   };

   return (
      <Button
         customStyles={styles.toggleSwitch}
         onClick={toggle}
      >
         
         {toggleSwitchText(!isToggled)}
         <span
            className={`
               ${styles.toggleSwitchKnob}
               ${isToggled ? styles.toggleSwitchKnobRight : ''}
            `}
         />
         
         {toggleSwitchText(isToggled)}
      </Button>
   );
};
