import { useEffect, useContext } from 'react';
import { SetterOrUpdater } from 'recoil';
import toast from 'react-hot-toast';

import { settingsContext } from 'features/settings-provider';
import { Tab } from 'features/tabs';
import { useDialog } from 'components/dialog';
import { getPreviousTabData, libraryTrackMark } from 'features/tabs/stores';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab;
   setTabs: SetterOrUpdater<Tab[]>;
   header?: boolean;
}

export const AddStuffButton = ({ tab, setTabs, header = false }: Props) => {

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

   const loadTabData = async (whenLoaded?: () => void) => {
      const previousTabs = await getPreviousTabData();

      window.api.getSongs().then(songs => {
         setTabs(previousTabs.map(tab => {
            const isLibraryTab = tab.id.includes(libraryTrackMark);

            if (isLibraryTab) {
               return {
                  ...tab,
                  collection: songs,
               };
            } else {
               return tab;
            }
         }));

         whenLoaded && whenLoaded();
      });
   };

   useEffect(() => {
      loadTabData();
   }, [ setTabs ]);

   const { getCurrentSettings } = useContext(settingsContext);

   const { generalSettings: { importBehaviour } } = getCurrentSettings();

   const openImportDialog = async () => {
      const { numberOfSongs, canceled } = await window.api.importSongs(importBehaviour.value);

      if (!canceled) {
         const songPlural = pluralize(numberOfSongs,'Song');
         const importingToast = toast.loading(`Importing ${songPlural}`);

         loadTabData(() => {
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
