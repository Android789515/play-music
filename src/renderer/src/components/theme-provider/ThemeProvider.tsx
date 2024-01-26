import { Themes } from 'features/settings-provider';

interface Props {
   theme: Themes;
}

export const ThemeProvider = ({ theme }: Props) => {
   return (
      <link
         rel={'stylesheet'}
         href={new URL(`./themes/${theme}.css`, import.meta.url).href}
      />
   );
};
