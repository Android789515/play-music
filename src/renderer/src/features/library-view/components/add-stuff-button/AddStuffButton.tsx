import { Tab } from 'features/tabs';
import { useDialog } from 'components/dialog';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab
}

export const AddStuffButton = ({ tab }: Props) => {

   const isLibraryTab = tab.name === 'Library';

   const { openDialog } = useDialog();

   const openAddStuffDialog = () => {
      const content = (
         isLibraryTab
            ? <p>Import</p>
            : <AddToCollection
               currentTab={tab}
            />
      );

      openDialog({
         content,
         dialogFormID: tab.id,
      });
   };

   return (
      <Button
         customStyles={styles.addStuffButton}
         onClick={openAddStuffDialog}
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
