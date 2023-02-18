type ConditionTest = () => boolean;

interface ConditionsBuilder {
   [condition: string]: ConditionTest;
}

export const testConditions = (conditionsBuilder: ConditionsBuilder) => {
   const conditionTests = Object.values(conditionsBuilder);

   return conditionTests.every(conditionTest => {
      return conditionTest() === true;
   });
};