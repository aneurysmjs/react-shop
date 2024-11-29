import { describe, it, expect } from 'vitest';
import { addProperty, updateProperty, removeProperty, moveProperty } from './object';

describe('object utils', () => {
  describe('addProperty', () => {
    it('should add a property', () => {
      expect(addProperty({}, 'some')).toStrictEqual({
        some: {},
      });
    });

    it('should add a property with a defined value', () => {
      expect(addProperty({}, 'some', 'value')).toStrictEqual({
        some: 'value',
      });
    });

    it('should add a property with existing properties', () => {
      expect(addProperty({ other: 'prop' }, 'some')).toStrictEqual({
        other: 'prop',
        some: {},
      });
    });

    it('should add nested properties', () => {
      expect(addProperty({}, 'some.nested.property')).toStrictEqual({
        some: {
          nested: {
            property: {},
          },
        },
      });
    });

    it('should add nested sibling properties', () => {
      expect(addProperty({}, 'some+a+b')).toStrictEqual({
        some: {},
        a: {},
        b: {},
      });
    });

    it('should add nested properties with sibling properties', () => {
      expect(addProperty({}, 'some.nested+a+b')).toStrictEqual({
        some: {
          nested: {},
        },
        a: {},
        b: {},
      });
    });

    it('should add deep nested properties with sibling properties', () => {
      expect(addProperty({}, 'some.deep.nested+a+b')).toStrictEqual({
        some: {
          deep: {
            nested: {},
          },
        },
        a: {},
        b: {},
      });
    });

    it('should add nested with sibling properties', () => {
      expect(addProperty({}, 'some+prop.nested+continue.with.other')).toStrictEqual({
        some: {},
        prop: {
          nested: {},
        },
        continue: {
          with: {
            other: {},
          },
        },
      });
    });
  });

  describe('updateProperty', () => {
    it('should update a nested property by given path', () => {
      const obj = {
        some: {
          nested: {
            property: 'foo',
          },
        },
      };

      const result = {
        some: {
          nested: {
            property: 'bar',
          },
        },
      };
      expect(updateProperty(obj, 'some.nested.property', 'bar')).toStrictEqual(result);
    });
  });

  describe('removeProperty', () => {
    it('should remove a nested property by given path', () => {
      const obj = {
        some: {
          nested: {
            property: 'foo',
          },
        },
      };

      const result = {
        some: {
          nested: {},
        },
      };

      expect(removeProperty(obj, 'some.nested.property')).toStrictEqual(result);
    });
  });

  describe('moveProperty', () => {
    it("should move 'b' to 'a'", () => {
      const obj = {
        a: {},
        b: {},
      };

      const result = {
        a: {
          b: {},
        },
      };

      expect(moveProperty(obj, 'b', 'a')).toStrictEqual(result);
    });

    it("should move 'b' to 'a'", () => {
      const obj = {
        a: {},
        b: {},
      };

      const result = {
        a: {
          b: {},
        },
      };
      expect(moveProperty(obj, 'b', 'a')).toStrictEqual(result);
    });

    it("should move 'b' to 'a' while preserving existing properties", () => {
      const obj = {
        a: {
          foo: {},
        },
        b: {},
      };

      const result = {
        a: {
          foo: {},
          b: {},
        },
      };
      expect(moveProperty(obj, 'b', 'a')).toStrictEqual(result);
    });
  });
});
