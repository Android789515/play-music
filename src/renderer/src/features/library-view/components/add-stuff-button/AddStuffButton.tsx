import { Tab } from 'features/tabs/types';
import { useDialog } from 'components/dialog/api';
import { addToCollectionID } from '../dialogs/add-to-collection';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab
}

export const AddStuffButton = ({ tab }: Props) => {
   const { setDialogContent, openDialog } = useDialog();

   const isLibraryTab = tab.name === 'Library';
   const addToCollection = () => {
      setDialogContent({
         content: (
            isLibraryTab
            ? <p>Import</p>
            : <AddToCollection />
         ),
         dialogFormID: (
            isLibraryTab ? '' : addToCollectionID
         ),
      });

      openDialog();
   };

   return (
      <Button
         customStyles={styles.addStuffButton}
         onClick={addToCollection}
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
