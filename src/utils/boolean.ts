type ConditionTest = () => boolean;

interface ConditionsBuilder {
   [ condition: string ]: ConditionTest;
}

export const testConditions = (conditionsBuilder: ConditionsBuilder) => {
   const conditionTests = Object.values(conditionsBuilder);
   const doesTestPass = (conditionTest: ConditionTest) => {
      return conditionTest() === true;
   }

   return {
      all: () => conditionTests.every(doesTestPass),
      any: () => conditionTests.some(doesTestPass)
   };
};