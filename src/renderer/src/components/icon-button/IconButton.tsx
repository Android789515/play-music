import type { ReactNode, HTMLAttributes } from 'react';

import type { CSS_Class } from 'types/cssTypes';

import { Button } from 'components/button';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   name: string;
   iconPath: string;
   buttonStyles?: CSS_Class;
   iconStyles: CSS_Class;
   children?: ReactNode;
}

export const IconButton = ({ name, iconPath, buttonStyles = '', iconStyles, children, ...rest }: Props) => {
   return (
      <Button
         customStyles={buttonStyles}
         {...rest}
      >
         <img
            className={iconStyles}
            src={iconPath}
            alt={name}
         />

         {children}
      </Button>
   );
};
