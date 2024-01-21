import styles from './Version.module.scss';

interface Props {
   name: string;
   version: string;
}

export const Version = ({ name, version }: Props) => {
   const separator = ': ';

   return (
      <li
         className={styles.version}
      >
         <span
            className={styles.name}
         >
            {name}
         </span>

         <span>
            {separator}
         </span>

         <span
            className={styles.versionNumber}
         >
            {version}
         </span>
      </li>
   );
};
