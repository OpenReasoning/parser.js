import {Node} from './index';

export function parse(formula: string): Node {
  if (/^[a-z0-9]+$/i.test(formula)) {
    return new Node(formula);
  }

  if (formula.charAt(0) !== '(') {
    throw new Error('Must surround formula with ()');
  }
  // First character was ()
  let i = 1;
  let open = 1;
  while (formula.charAt(i) === ' ') {
    i++;
  }

  const children: Node[] = [];

  // get first argument
  let current = '';
  while (i < formula.length) {
    const char = formula.charAt(i);
    if (char === ' ' && open == 1) {
      break;
    }
    else if (char === '(') {
      open++;
    }
    else if (char === ')') {
      open--;
      if (open === 0) {
        break;
      }
    }
    current += char;
    i++;
  }

  if (open === 0) {
    while (i < formula.length) {
      if (formula.charAt(i) !== ')') {
        throw new Error('Invalid character');
      }
      i++;
    }
    return new Node(current);
  }
  children.push(parse(current));

  while (formula.charAt(i) === ' ') {
    i++;
  }

  // get second argument
  current = '';
  while (i < formula.length) {
    const char = formula.charAt(i);
    if (char === ' ' && open == 1) {
      break;
    }
    else if (char === '(') {
      throw new Error('Invalid character (');
    }
    else if (char === ')') {
      throw new Error('Invalid character (');
    }
    current += char;
    i++;
  }

  const node = new Node(current);
  while (formula.charAt(i) === ' ') {
    i++;
  }

  // get third argument
  current = '';
  let space = false;
  while (i < formula.length) {
    const char = formula.charAt(i);
    if (char === ' ' && open == 1) {
      space = true;
      i++;
      continue;
    }
    else if (char === '(') {
      if (space) {
        throw new Error('Invalid character (');
      }
      open++;
    }
    else if (char === ')') {
      open--;
      if (open === 0) {
        break;
      }
    }
    else if (space) {
      throw new Error(`Invalid character ${char}`);
    }
    current += char;
    i++;
  }
  children.push(parse(current));
  node.children = children;

  return node;
}
