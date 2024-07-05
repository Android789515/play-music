import { useContext } from 'react';
import toast from 'react-hot-toast';

import { settingsContext } from 'features/settings-provider';
import { useTabs, Tab } from 'features/tabs';
import { useDialog } from 'components/dialog';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab;
   header?: boolean;
}

export const AddStuffButton = ({ tab, header = false }: Props) => {

   const isLibraryTab = tab.name === 'Library';

   const { openDialog } = useDialog();

   const openAddStuffDialog = () => {
      const content = (
         <AddToCollection
            currentTab={tab}
         />
      );

      openDialog({
         content,
         dialogFormID: tab.id,
      });
   };

   const pluralize = (number: number, word: string) => {
      return number > 1
         ? `${number} ${word}s`
         : word;
   };

   const { refreshLibrary } = useTabs();

   const { getCurrentSettings } = useContext(settingsContext);

   const { generalSettings: { importBehaviour } } = getCurrentSettings();

   const openImportDialog = async () => {
      const { numberOfSongs, canceled } = await window.api.importSongs(importBehaviour.value);

      if (!canceled) {
         const songPlural = pluralize(numberOfSongs,'Song');
         const importingToast = toast.loading(`Importing ${songPlural}`);

         refreshLibrary().finally(() => {
            toast.success(`Successfully Imported ${songPlural}`, {
               id: importingToast,
            });
         });
      }
   };

   const handleButtonClick = () => {
      isLibraryTab
         ? openImportDialog()
         : openAddStuffDialog();
   };

   return (
      <Button
         customStyles={`
            ${styles.addStuffButton}
            ${header ? styles.addStuffButtonHeader : ''}
         `}
         onClick={handleButtonClick}
      >
         <h4
            className={styles.addStuffText}
         >
            { isLibraryTab
               ? 'Import'
               : 'Add to Collection'
            }
         </h4>
      </Button>
   );
};
