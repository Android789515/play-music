import { capitalize } from 'utils/string';

import styles from './MediaControlButton.module.scss';

import { IconButton } from 'components/icon-button';

interface Props {
   name: string;
}

export const MediaControlButton = ({ name }:  Props) => {
   const getFilename = () => {
      const filename = name.split(' ')
                           .join('-')
                           .toLowerCase();

      return filename;
   };

   const getClassName = () => {
      const [ firstWord, ...rest ] = name.split(' ');

      const className = (
         firstWord.toLowerCase()
         + rest.map(word => capitalize(word)).join('')
      );

      return className;
   };

   return (
      <IconButton
         name={name}
         iconPath={`./assets/icons/${getFilename()}.svg`}
         buttonStyles={`
            ${styles.mediaControlButton}
            ${styles[getClassName() + 'Button']}
         `}
         iconStyles={styles[getClassName() + 'Icon']}
      />
   );
};
