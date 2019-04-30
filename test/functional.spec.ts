import {Node} from '../src/index';
import {parse} from '../src/functional';

test('simple parse', (): void => {
  expect(parse('test')).toEqual(new Node('test'));
});

test('simple parse of one node and two children', (): void => {
  let expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(parse('and(a,b)')).toEqual(expected);
});

test('parse complex node', (): void => {
  let expected = new Node('and');
  expected.children.push(new Node('or'));
  expected.children.push(new Node('if'));
  expected.children[0].children.push(new Node('a'));
  expected.children[0].children.push(new Node('b'));
  expected.children[1].children.push(new Node('c'));
  expected.children[1].children.push(new Node('d'));
  expect(parse('and(or(a,b),if(c,d))')).toEqual(expected);
});

test('parse trim whitespace', (): void => {
  expect(parse('  a  ')).toEqual(new Node('a'));
});

test('parse trim whitespace of children', (): void => {
  let expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(parse('and( a , b )')).toEqual(expected);
});

test('empty parse throws error', (): void => {
  expect((): void => {
    parse('');
  }).toThrow();
});

test('parse empty first child throws error', (): void => {
  expect((): void => {
    parse('and(,b)');
  }).toThrow();
});

test('parse empty second child throws error', (): void => {
  expect((): void => {
    parse('and(a,)');
  }).toThrow();
});

test('parse multiple children', (): void => {
  let expected = new Node('Test');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expected.children.push(new Node('c'));
  expect(parse('Test(a,b,c)')).toEqual(expected);
});

test('ignore extra closing parantheses', (): void => {
  let expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(parse('and(a,b))))')).toEqual(expected);
});

test('throw error on invalid parse', (): void => {
  expect((): void => {
    parse('and)');
  }).toThrow();
});
