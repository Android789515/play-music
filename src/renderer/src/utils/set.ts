export const mapOverSet = <Type>(set: Set<Type>, callback) => {
   const newSet = [...set].map<Type>((...args) => callback(...args));

   return new Set([...newSet]);
};
