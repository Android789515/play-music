export const capitalize = (string: string) => {
   const capitalizedFirstLetter = string[ 0 ].toUpperCase();
   const restOfString = string.slice(1);

   return capitalizedFirstLetter + restOfString;
};
