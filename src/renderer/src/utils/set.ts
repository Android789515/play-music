type IterateFunction<Type> = (arrayFromSet: Type[]) => Type[];

export const easyIterate = <Type>(set: Set<Type>, iterateFunction: IterateFunction<Type>) => {
   const iterationResult = iterateFunction([...set]);

   return new Set([ ...iterationResult ]);
};