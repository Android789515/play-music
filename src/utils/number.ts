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
      timeInSeconds % 3600
   );

   return `${hours}:${minutes}:${leftOverSeconds}`;
};