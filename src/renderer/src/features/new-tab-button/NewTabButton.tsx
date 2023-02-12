import plusIcon from './assets/icons/plus.svg';
import styles from './NewTabButton.module.scss';

import { IconButton } from 'components/icon-button';

export const NewTabButton = () => {
   return (
      <IconButton
         name={'New Tab Button'}
         iconPath={plusIcon}
         buttonStyles={styles.newTabButton}
         iconStyles={styles.plusIcon}
      />
   );
};
