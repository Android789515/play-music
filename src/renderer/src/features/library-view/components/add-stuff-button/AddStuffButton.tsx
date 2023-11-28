import { useRecoilState } from 'recoil';

import { Tab } from 'features/tabs/types';
import { dialogState } from 'components/dialog/stores';
import { openDialog, setDialogContent } from 'components/dialog/api';
import { addToCollectionID } from '../dialogs/add-to-collection';

import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { AddToCollection } from '../dialogs/add-to-collection';

interface Props {
   tab: Tab
}

export const AddStuffButton = ({ tab }: Props) => {
   const [ _, setDialogState ] = useRecoilState(dialogState);

   const isLibraryTab = tab.name === 'Library';
   const addToCollection = () => {
      const renderDialog = setDialogContent(
         isLibraryTab
            ? <p>Import</p>
            : <AddToCollection />
      , isLibraryTab ? '' : addToCollectionID);

      renderDialog(setDialogState);

      openDialog(setDialogState);
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
