import {Node, prefixParser, functionalParser, infixParser} from '../src/index';

test('create new node', (): void => {
  expect(new Node('a')).toEqual(new Node('a'));
});

test('error create empty node', (): void => {
  expect((): void => {
    new Node('');
  }).toThrow();
});

test('prefixParser', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(prefixParser('(and a b)')).toEqual(expected);
});

test('functionalParser', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(functionalParser('and(a,b)')).toEqual(expected);
});

test('infixParser', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(infixParser('(a and b)')).toEqual(expected);
});
