export const mapOverSet = <Type>(set: Set<Type>, callback) => {
   const newSet = [...set].map<Type>((...args) => callback(...args));

   return new Set([...newSet]);
};

export const filterSet = <Type>(set: Set<Type>, callback) => {
   const newSet = [ ...set ].filter<Type>(callback);

   return new Set([...newSet]);
};

type IterateFunction<Type> = (arrayFromSet: Type[]) => Type[];

export const easyIterate = <Type>(set: Set<Type>, iterateFunction: IterateFunction<Type>) => {
   const iterationResult = iterateFunction([...set]);

   return new Set([ ...iterationResult ]);
};