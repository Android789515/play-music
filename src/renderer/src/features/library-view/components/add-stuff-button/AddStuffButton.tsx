import toast from 'react-hot-toast';

import { Tab } from 'features/tabs';
import { useDialog } from 'components/dialog';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab;
   loadTabData: (whenLoaded?: () => void) => void;
}

export const AddStuffButton = ({ tab, loadTabData }: Props) => {

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

   const openImportDialog = async () => {
      const numberOfFiles = await window.api.importSongs();

      const filePlural = pluralize(numberOfFiles,'File');
      const importingToast = toast.loading(`Importing ${filePlural}`);

      loadTabData(() => {
         toast.success(`Successfully Imported ${filePlural}`, {
            id: importingToast,
         });
      });
   };

   const handleButtonClick = () => {
      isLibraryTab
         ? openImportDialog()
         : openAddStuffDialog();
   };

   return (
      <Button
         customStyles={styles.addStuffButton}
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
