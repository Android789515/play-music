import chevronUpIcon from './assets/icons/chevron-up.svg';
import styles from './ArrowToggle.module.scss';

import { IconButton } from 'components/icon-button';

interface Props {
   isToggled: boolean;
   onToggle: () => void;
}

export const ArrowToggle = ({ isToggled, onToggle }: Props) => {

   return (
      <IconButton
         name='Song Queue Expander'
         buttonStyles={styles.arrowToggle}
         iconPath={chevronUpIcon}
         iconStyles={`
            ${styles.arrowToggleIcon}
            ${!isToggled ? styles.arrowToggleIcon_OtherDirection : ''}
         `}
         onClick={onToggle}
      />
   );
};
