enum Operation {
  addition = 'plus',
  subtract = 'minus',
  multiplication = 'multipliedby',
  division = 'dividedby',
}

export const answer = (question: string): number => {
  const [, , firstNum, operation, operand, ...rest] = question
    .replaceAll('divided by', 'dividedby') // make this a single word so it's easier to parse
    .replaceAll('multiplied by', 'multipliedby') // make this a single word so it's easier to parse
    .replace('?', '') // remove the trailing ?
    .split(' ');

  if (isNaN(parseInt(firstNum, 10))) throw new Error('Unknown operation');

  if (!operation) {
    // just a single number
    return parseInt(firstNum, 10);
  }

  if (!rest.length) {
    // there's only one operation
    const first = parseInt(firstNum, 10);
    const second = parseInt(operand, 10);
    switch (operation) {
      case Operation.addition:
        return first + second;
      default:
        throw new Error('Unknown operation');
    }
  } else {
    // multiple operations
  }
}
