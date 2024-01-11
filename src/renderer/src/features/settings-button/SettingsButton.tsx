import { useDialog } from 'components/dialog';

import settingsIcon from './assets/icons/settings.svg';
import styles from './SettingsButton.module.scss';

import { SettingsDialog } from './components/settings-dialog';
import { IconButton } from 'components/icon-button';

export const SettingsButton = () => {
   const { openDialog, closeDialog } = useDialog();

   const openSettingsDialog = () => {
      openDialog(
         <SettingsDialog
            closeDialog={closeDialog}
         />
      );
   };

   return (
      <IconButton
         name={'Settings Button'}
         iconPath={settingsIcon}
         buttonStyles={styles.settingsButton}
         iconStyles={styles.settingsIcon}
         onClick={openSettingsDialog}
      />
   );
};
