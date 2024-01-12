import { v4 as newUUID } from 'uuid';

import { useDialog } from 'components/dialog';

import settingsIcon from './assets/icons/settings.svg';
import styles from './SettingsButton.module.scss';

import { SettingsDialog } from './components/settings-dialog';
import { IconButton } from 'components/icon-button';

export const SettingsButton = () => {
   const { openDialog } = useDialog();

   const openSettingsDialog = () => {
      const settingsDialogID = newUUID();

      openDialog({
         content: (
            <SettingsDialog
               formID={settingsDialogID}
            />
         ),
         dialogFormID: settingsDialogID,
      });
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
