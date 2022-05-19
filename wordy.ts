enum Operation {
  addition = 'plus',
  subtract = 'minus',
  multiplication = 'multipliedby',
  division = 'dividedby',
}

const compute = (firstNum: string, secondNum: string, operation: Operation): number => {
  const first = parseInt(firstNum, 10);
  const second = parseInt(secondNum, 10);
  switch (operation) {
    case Operation.addition:
      return first + second;
    case Operation.subtract:
      return first - second;
    case Operation.multiplication:
      return first * second;
    case Operation.division:
      return first / second;
    default:
      throw new Error('Unknown operation');
  }
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
    return compute(firstNum, operand, operation as Operation)
  } else {
    // multiple operations
    const initRes = compute(firstNum, operand, operation as Operation);
    const pairs = rest.reduce((acc, curr, index, array) => {
      if (index % 2 === 0) {
        // @ts-ignore
        acc.push(array.slice(index, index + 2));
      }
      return acc;
    }, []);
    // @ts-ignore
    return pairs.reduce((acc: number, [operation, secondNum]) => {
      const newTotal = compute(acc.toString(), secondNum, operation);
      return newTotal;
    }, initRes)
  }
}
