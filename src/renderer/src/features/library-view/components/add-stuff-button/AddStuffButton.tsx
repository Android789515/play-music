import { Tab } from 'features/tabs';
import { useDialog } from 'components/dialog';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab;
   loadTabData: () => void;
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

   const openImportDialog = async () => {
      await window.api.importSongs();

      loadTabData();
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
