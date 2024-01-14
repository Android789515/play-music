export const capitalize = (string: string) => {
   const capitalizedFirstLetter = string[ 0 ].toUpperCase();
   const restOfString = string.slice(1);

   return capitalizedFirstLetter + restOfString;
};

export const splitPascalWord = (word: string) => {
   const pascalWord = /([A-Z][a-z])/;
   const addSpaceBefore = ' $1';
   
   return word.replace(pascalWord, addSpaceBefore);
};
