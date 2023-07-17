import plusIcon from './assets/icons/square-rounded-plus.svg';
import styles from './AddStuffButton.module.scss';

import { Button } from 'components/button';
import { Icon } from 'components/icon';

export const AddStuffButton = () => {
   return (
      <Button
         customStyles={styles.addStuffButton}
      >
         <Icon
            customStyles={styles.addStuffIcon}
            iconPath={plusIcon}
            alt='Add Stuff'
         />

         <h4
            className={styles.addStuffText}
         >
            Add Stuff
         </h4>
      </Button>
   );
};
