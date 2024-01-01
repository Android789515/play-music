import settingsIcon from './assets/icons/settings.svg';
import styles from './SettingsButton.module.scss';

import { IconButton } from 'components/icon-button';

export const SettingsButton = () => {
   return (
      <IconButton
         name={'Settings Button'}
         iconPath={settingsIcon}
         buttonStyles={styles.settingsButton}
         iconStyles={styles.settingsIcon}
      />
   );
};
