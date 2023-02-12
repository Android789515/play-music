import type { CSS_Class } from 'types/cssTypes';

import { Button } from 'components/button';

interface Props {
   name: string;
   iconPath: string;
   buttonStyles?: CSS_Class;
   iconStyles: CSS_Class;
}

export const IconButton = ({ name, iconPath, buttonStyles = '', iconStyles }: Props) => {
   return (
      <Button
         customStyles={buttonStyles}
      >
         <img
            className={iconStyles}
            src={iconPath}
            alt={name}
         />
      </Button>
   );
};
