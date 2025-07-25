export const toDoubleDigit = (number: number) => {
   const measurableNumber = String(number);

   const isSingleDigit = measurableNumber.length === 1;

   const isMoreThanTwoDigits = measurableNumber.length > 2;

   if (isSingleDigit) {
      return '0' + number;
   } else if (isMoreThanTwoDigits) {
      return measurableNumber.slice(0, 2);
   } else {
      // Is number exactly two digits
      return number;
   }
};

export const formatSongTime = (timeInSeconds: number) => {
   const minutes = toDoubleDigit(
      Math.floor((timeInSeconds / 60) % 60)
   );

   const hours = toDoubleDigit(
      Math.floor((timeInSeconds / 3600))
   );

   const leftOverSeconds = toDoubleDigit(
      Math.floor(timeInSeconds % 3600)
   );

   const hoursIfPresent = Number(hours) ? `${hours}:` : '';

   return `${hoursIfPresent}${minutes}:${leftOverSeconds}`;
};

export const within = (number: number, numberRange: [ number, number ]) => {
   const [ lowerBound, upperBound ] = numberRange;

   return number >= lowerBound && number <= upperBound;
};
