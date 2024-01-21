import styles from './Version.module.scss';

interface Props {
   techName: string;
   versionNumber: string;
}

export const Version = ({ techName, versionNumber }: Props) => {
   const separator = ': ';

   return (
      <li
         className={styles.version}
      >
         <span
            className={styles.techName}
         >
            {techName}
         </span>

         <span>
            {separator}
         </span>

         <span
            className={styles.versionNumber}
         >
            {versionNumber}
         </span>
      </li>
   );
};
