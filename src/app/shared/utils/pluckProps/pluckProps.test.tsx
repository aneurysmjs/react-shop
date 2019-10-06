import pluckProps from './pluckProps';

type Obj = {
  a: 1;
  b: 2;
};

describe('pluckProps', () => {
  it('should return a function', () => {
    const fn = pluckProps<Obj>('a');
    expect(typeof fn).toEqual('function');
  });

  it('should return an object with property "a" and ignore the rest', () => {
    const fn = pluckProps<Obj>('a');
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({ a: 1 });
  });

  it('should return an object with properties "a" and "b"', () => {
    const fn = pluckProps<Obj>('a', 'b');
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('should return an object with property "b"', () => {
    const fn = pluckProps<Obj>('b');
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({ b: 2 });
  });

  // eslint-disable-next-line prettier/prettier
  it('should return empty object if the given object doesn\'t match with properties to reflect', () => {
    const fn = pluckProps<Obj>('a', 'b');
    const obj = fn({ c: 3, d: 4 });
    expect(obj).toEqual({});
  });

  // eslint-disable-next-line prettier/prettier
  it('should return empty object if there\'s not properties to append', () => {
    const fn = pluckProps<Obj>();
    const obj = fn({ a: 1, b: 2 });
    expect(obj).toEqual({});
  });
  // eslint-disable-next-line prettier/prettier
  it('should throw if there\'s not object to reflect', () => {
    const fn = pluckProps<Obj>('a', 'b');
    expect(() => {
      fn();
    }).toThrow();
  });
});
