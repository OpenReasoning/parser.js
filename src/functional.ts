import {Node} from './index';

export function parse(formula: string): Node {
  formula = formula.trim();
  if (formula.length === 0) {
    throw new Error('Cannot parse empty string');
  }
  if (/^[a-z0-9]+$/i.test(formula)) {
    return new Node(formula);
  }
  let current = '';
  let i = 0;
  let node: Node | undefined;
  while (i < formula.length) {
    let char: string = formula.charAt(i);
    if (char === '(') {
      node = new Node(current);
      current = '';
      let open = 0;
      let j = i+1;
      while (j < formula.length) {
        char = formula.charAt(j);
        if (char === '(') {
          open++;
          current += char;
        }
        else if (char === ')') {
          if (open === 0) {
            node.children.push(parse(current));
            current = '';
            break;
          }
          else {
            open--;
            current += char;
          }
        }
        else if (char === ',' && open === 0) {
          node.children.push(parse(current));
          current = '';
        }
        else {
          current += char;
        }
        j++;
      }
      i = j+1;
    }
    else if (char === ')') {
      break;
    }
    else {
      current += char;
    }
    i++;
  }
  if (node !== undefined) {
    return node;
  }
  throw Error('Could not parse formula');
}