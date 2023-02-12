import sortIcon from './assets/icons/up-arrow.svg';
import styles from './LibraryViewHeader.module.scss';

interface Props {
   headerText: string;
   isSorting?: boolean;
}

export const LibraryViewHeader = ({ headerText, isSorting }: Props) => {
   return (
      <div
         tabIndex={1}
         className={styles.libraryViewHeader}
      >
         <h3 className={styles.libraryViewHeaderText}>
            {headerText}
         </h3>

         <img
            className={styles.sortArrowIcon}
            src={sortIcon}
            alt={'Sort Order'}
         />
      </div>
   );
};
