import type { HTMLAttributes, ReactNode } from 'react';

import type { Path } from '@globalTypes/fileTypes';
import type { CSS_Class } from 'types/cssTypes';

import defaultStyles from './IconButton.module.scss';

import { Button } from 'components/button';
import { Icon } from 'components/icon';

interface Props extends HTMLAttributes<HTMLButtonElement> {
   name: string;
   iconPath: Path;
   buttonStyles?: CSS_Class;
   iconStyles: CSS_Class;
   children?: ReactNode;
}

export const IconButton = ({ name, iconPath, buttonStyles = '', iconStyles, children, ...rest }: Props) => {
   return (
      <Button
         customStyles={`
            ${defaultStyles.iconButton}
            ${buttonStyles}
         `}
         {...rest}
      >
         <Icon
            customStyles={iconStyles}
            iconPath={iconPath}
            alt={name}
         />

         {children}
      </Button>
   );
};
