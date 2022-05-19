export const answer = (question: string): number => {
  const [, , firstNum, operation, operand, ...rest] = question
    .replaceAll('divided by', 'dividedby') // make this a single word so it's easier to parse
    .replaceAll('multiplied by', 'multipliedby') // make this a single word so it's easier to parse
    .split(' ');

  if (isNaN(parseInt(firstNum, 10))) throw new Error('Unknown operation');


}
