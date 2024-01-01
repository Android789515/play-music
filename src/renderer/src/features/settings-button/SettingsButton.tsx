import { useDialog } from 'components/dialog/api';

import settingsIcon from './assets/icons/settings.svg';
import styles from './SettingsButton.module.scss';

import { SettingsDialog } from './components/settings-dialog';
import { IconButton } from 'components/icon-button';

export const SettingsButton = () => {
   const { setDialogContent, openDialog } = useDialog();

   const openSettingsDialog = () => {
      setDialogContent({
         content: <SettingsDialog />,
      });

      openDialog();
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
