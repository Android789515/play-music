import styles from './SoundVisualizer.module.scss';

interface Props {
   shown?: boolean;
   buffer: {
      length: number;
      data: Uint8Array;
   };
}

export const SoundVisualizer = ({ shown, buffer: { length, data } }: Props) => {
   const barAmountFactor = 128;

   const barAmount = length / barAmountFactor;

   return (
      <div
         className={`
            ${styles.soundVisualizer}
            ${shown ? styles.soundVisualizerShown : ''}
         `}
      >
         <div
            className={styles.soundVisualizerLayout}
            style={{
               gridTemplateColumns: `repeat(${barAmount}, 2px)`,
            }}
         >
            {[ ...data ]
               .filter((_, index) => index % barAmountFactor === 0)
               .map((piece, index) => {
                  return (
                     <div
                        key={index}
                        className={styles.bar}
                        style={{
                           height: `${piece / 10}px`,
                        }}
                     ></div>
                  );
               })}
         </div>
      </div>
   );
};
