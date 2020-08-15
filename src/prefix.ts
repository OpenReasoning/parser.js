import {Node} from './index';

export function parse(formula: string): Node {
  formula = formula.trim();
  if (formula.length === 0) {
    throw new Error('Cannot parse empty formulas');
  }

  if (/^[a-z0-9]+$/i.test(formula)) {
    return new Node(formula);
  }

  let current = '';
  if (formula.charAt(0) !== '(') {
    throw new Error('Must surround formula with ()');
  }
  // First character was ()
  let i = 1;
  let open = 1;
  while (i < formula.length) {
    const char = formula.charAt(i);
    if (char === '(') {
      throw new Error('Cannot have ( in first argument');
    }
    else if (char === ')') {
      open--;
      i++;
      break;
    }
    else if (char === ' ') {
      i++;
      break;
    }
    current += char;
    i++;
  }
  if (current === '') {
    throw new Error('Cannot have blank first argument');
  }
  const node = new Node(current);
  if (open === 0) {
    while (i < formula.length) {
      if (formula.charAt(i) !== ')') {
        throw new Error('Invalid character detected');
      }
    }
    return node;
  }
  current = '';
  while (i < formula.length) {
    const char = formula.charAt(i);
    if (char === ' ' && open === 1) {
      if (current !== '') {
        node.children.push(parse(current));
        current = '';
      }
      i++;
      continue;
    }

    if (char === '(') {
      open++;
    }
    else if (char === ')') {
      open--;
      if (open === 0) {
        node.children.push(parse(current));
        i++;
        break;
      }
    }
    current += char;
    i++;
  }

  while (i < formula.length) {
    if (formula.charAt(i) !== ')') {
      throw new Error('Invalid character detected');
    }
    i++;
  }
  return node;
}
