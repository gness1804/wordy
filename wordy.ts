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

const isValidOperation = (operation: string): boolean => {
  return operation === Operation.addition || operation === Operation.subtract || operation === Operation.multiplication || operation === Operation.division
}

export const answer = (question: string): number => {
  const [, , firstNum, operation, operand, ...rest] = question
    .replaceAll('divided by', 'dividedby') // make this a single word so it's easier to parse
    .replaceAll('multiplied by', 'multipliedby') // make this a single word so it's easier to parse
    .replace('?', '') // remove the trailing ?
    .split(' ');

  if (!operation) {
    // just a single number
    const num = parseInt(firstNum, 10);
    if (!num) throw new Error('Syntax error')
    if (isNaN(num)) throw new Error('Unknown operation');
    return num;
  }

  if (!isNaN(parseInt(operation, 10))) throw new Error('Syntax error')

  if (!isValidOperation(operation)) throw new Error('Unknown operation');

  if (!operand) throw new Error('Syntax error')
  if (isNaN(parseInt(operand, 10))) throw new Error('Syntax error')

  // assume valid question structure from here on.
  if (!rest.length) {
    // there's only one operation
    return compute(firstNum, operand, operation as Operation)
  } else {
    // multiple operations
    const initRes = compute(firstNum, operand, operation as Operation);
    const pairs = rest.reduce((acc, curr, index, array) => {
      if (index % 2 === 0) {
        if (!isValidOperation(curr)) throw new Error('Syntax error')
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
