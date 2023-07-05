import type { CSS_Class } from 'types/cssTypes';
import type { Path } from '@globalTypes/fileTypes';

import defaultStyles from './Icon.module.scss';

interface Props {
   customStyles: CSS_Class;
   iconPath: Path;
   alt: string;
}

export const Icon = ({ customStyles, iconPath, alt }: Props) => {
   return (
      <img
         className={`
            ${defaultStyles.icon}
            ${customStyles}
         `}
         src={iconPath}
         alt={alt}
         draggable={false}
      />
   );
};
