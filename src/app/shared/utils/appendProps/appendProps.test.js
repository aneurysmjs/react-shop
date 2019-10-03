import appendProps from './appendProps';

describe('footer action', () => {
  it('should return a function', () => {
    const fn = appendProps('yeah');
    expect(typeof fn).toEqual('function');
  });

  it('should return an object with property "a" and ignore the rest', () => {
    const fn = appendProps('a');
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({ a: 1 });
  });

  it('should return an object with properties "a" and "b"', () => {
    const fn = appendProps('a', 'b');
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('should return an object with property "b"', () => {
    const fn = appendProps('b');
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({ b: 2 });
  });

  it('should return empty object if the given object doesn\'t match with properties to reflect', () => {
    const fn = appendProps('a', 'b');
    const obj = fn({ c: 3, d: 4 });
    expect(obj).toEqual({});
  });

  it('should return empty object if there\'s not properties to append', () => {
    const fn = appendProps();
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({});
  });

  it('should throw if there\'s not object to reflect', () => {
    const fn = appendProps('a', 'b');
    expect(() => { fn(); }).toThrow();
  });
});
