import styles from './AnimatedEllipsis.module.scss';

interface Props {
   order: number;
}

export const AnimatedEllipsis = ({ order }: Props) => {
   return (
      <span
         className={styles.animatedEllipsis}
         style={{
            animationDelay: `${order / 4}s`,
         }}
      >
         .
      </span>
   );
};
