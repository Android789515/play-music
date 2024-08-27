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
               gridTemplateColumns: `repeat(${length / barAmountFactor}, 1fr)`,
            }}
         >
            {[ ...data ].map((piece, index) => {
               if (index % barAmountFactor === 0) {
                  return (
                     <div
                        key={index}
                        className={styles.bar}
                        style={{
                           height: `${piece / 10}px`,
                        }}
                     ></div>
                  );
               } else {
                  return null;
               }
            })}
         </div>
      </div>
   );
};
