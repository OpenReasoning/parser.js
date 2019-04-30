export class Node {
  public value: string;
  public children: Node[] = [];

  public constructor(value: string) {
    if (value.length === 0) {
      throw new Error('Value cannot be empty');
    }
    this.value = value;
  }
}

export {parse as prefixParser} from './prefix';
export {parse as functionalParser} from './functional';
export {parse as infixParser} from './infix';