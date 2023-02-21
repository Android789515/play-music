import { capitalize } from 'utils/string';

import styles from './TabName.module.scss';

interface Props {
   tabName: string;
}

export const TabName = ({ tabName }: Props) => {
   return (
      <h2
         tabIndex={1}
         className={styles.tabName}
      >
         {capitalize(tabName)}
      </h2>
   );
};