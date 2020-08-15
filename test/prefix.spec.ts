import {Node} from '../src/index';
import {parse} from '../src/prefix';

test('simple parse', (): void => {
  expect(parse('a')).toEqual(new Node('a'));
});

test('simple parse2', (): void => {
  expect(parse('(a)')).toEqual(new Node('a'));
});

test('simple parse with children', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(parse('(and a b)')).toEqual(expected);
});

test('test nested parse', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('or'));
  expected.children[0].children.push(new Node('a'));
  expected.children[0].children.push(new Node('b'));
  expected.children.push(new Node('if'));
  expected.children[1].children.push(new Node('c'));
  expected.children[1].children.push(new Node('d'));
  expect(parse('(and (or a b) (if c d))'));
});

test('throw error on parse no starting (', (): void => {
  expect((): void => {
    parse('and a b');
  }).toThrow();
});

test('error on parse empty formula', (): void => {
  expect((): void => {
    parse('');
  }).toThrow();
});

test('error on parse empty formula with parentheses', (): void => {
  expect((): void => {
    parse('()');
  }).toThrow();
});

test('error on blank first argument', (): void => {
  expect((): void => {
    parse('( a b)');
  }).toThrow();
});

test('invalid character after closing parenthesis simple', (): void => {
  expect((): void => {
    parse('(a)(');
  }).toThrow();
});

test('error when ( in first argument', (): void => {
  expect((): void => {
    parse('(a(and a b))');
  }).toThrow();
});

test('invalid character after closing parenthesis arguments', (): void => {
  expect((): void => {
    parse('(and a b)a');
  }).toThrow();
});

test('parse valid with extra closing parenthesis', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(parse('(and a b))))')).toEqual(expected);
});

test('multiple arguments', (): void => {
  const expected = new Node('and');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expected.children.push(new Node('c'));
  expect(parse('(and a b c)')).toEqual(expected);
});
