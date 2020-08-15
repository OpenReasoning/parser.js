import {Node} from '../src/index';
import {parse} from '../src/infix';

test('simple parse', (): void => {
  expect(parse('a')).toEqual(new Node('a'));
});

test('simple parse with paranthesis', (): void => {
  expect(parse('(a)')).toEqual(new Node('a'));
});

test('parse with three arguments', (): void => {
  const expected = new Node('&');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('b'));
  expect(parse('(a & b')).toEqual(expected);
});

test('parse nested arguments', (): void => {
  const expected = new Node('&');
  expected.children.push(new Node('|'));
  expected.children[0].children.push(new Node('a'));
  expected.children[0].children.push(new Node('b'));
  expected.children.push(new Node('c'));
  expect(parse('((a | b) & c)')).toEqual(expected);
});

test('parse left nested arguments', (): void => {
  const expected = new Node('&');
  expected.children.push(new Node('c'));
  expected.children.push(new Node('|'));
  expected.children[1].children.push(new Node('a'));
  expected.children[1].children.push(new Node('b'));
  expect(parse('(c & (a | b))')).toEqual(expected);
});

test('error for missing opening paranthesis', (): void => {
  expect((): void => {
    parse('a b');
  }).toThrow();
});

test('extra ending characters simple', (): void => {
  expect(parse('(a))')).toEqual(new Node('a'));
});

test('error extra ending characters', (): void => {
  expect((): void => {
    parse('(a)))b');
  }).toThrow();
});

test('error when ( in second argument', (): void => {
  expect((): void => {
    parse('(a b(c c)');
  }).toThrow();
});

test('error when ) in second argument', (): void => {
  expect((): void => {
    parse('(a b)c c)');
  }).toThrow();
});

test('extra spaces', (): void => {
  const expected = new Node('bc');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('c'));
  expect(parse('(a  bc  c)')).toEqual(expected);
});

test('extra spaces before first argument', (): void => {
  const expected = new Node('bc');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('c'));
  expect(parse('(   a bc c)')).toEqual(expected);
});

test('extra spaces after last argument', (): void => {
  const expected = new Node('bc');
  expected.children.push(new Node('a'));
  expected.children.push(new Node('c'));
  expect(parse('(a bc c    )')).toEqual(expected);
});

test('error on character after spaces after last argument', (): void => {
  expect((): void => {
    parse('(a b c d)');
  }).toThrow();
});

test('error on open paranthesis after spaces after last argument', (): void => {
  expect((): void => {
    parse('(a b c ()');
  }).toThrow();
});
