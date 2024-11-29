import { describe, it, expect } from 'vitest';
import {
  propertyPathParser,
  validatePropertyPathWithSiblings,
  isValidPropertyPath,
  propertyPathWithSiblings,
  makePropertyPathTokens,
} from './pathParser';

describe('pathParse', () => {
  describe('propertyPathParser', () => {
    it('should parse string by extracting the sibling properties', () => {
      expect(propertyPathParser('some.nested[a, b]')).toStrictEqual([
        'some.nested',
        { a: {}, b: {} },
      ]);
    });

    it.todo('should parse string by extracting the sibling properties with labeled values', () => {
      expect(propertyPathParser('some.nested[a:lorem ipsum, b:dolor it samet]')).toStrictEqual([
        'some.nested',
        { a: 'lorem ipsum', b: 'dolor it samet' },
      ]);
    });
  });

  describe('validatePropertyPathWithSiblings', () => {
    // Valid cases
    it('should return true for a string with valid array format', () => {
      expect(validatePropertyPathWithSiblings('some.nested[a,b]')).toBe(true);
    });

    // Invalid cases
    it('should return false for a simple string', () => {
      expect(validatePropertyPathWithSiblings('some.nested')).toBe(false);
    });

    it('should return false for a string with dot before array format', () => {
      expect(validatePropertyPathWithSiblings('some.nested.[a,b]')).toBe(false);
    });

    it('should return false for missing closing bracket', () => {
      expect(validatePropertyPathWithSiblings('some.nested[a')).toBe(false);
    });

    it('should return false for missing content and closing bracket', () => {
      expect(validatePropertyPathWithSiblings('some.nested[')).toBe(false);
    });

    it.skip('should return false for misplaced dot before brackets', () => {
      expect(validatePropertyPathWithSiblings('some.nested.a[b]')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(validatePropertyPathWithSiblings('')).toBe(false);
    });
  });

  describe('isValidPropertyPath', () => {
    const cases = [
      ['some', true],
      ['some+prop', true],
      ['some.prop', true],
      ['some.nested+prop', true],
      ['some+prop.nested', true],
      ['some+prop.nested+with.more+siblings.and.more.nested', true],
      ['some+prop.nested+continue.with.other', true],
      ['some.deep.prop+with.sibling', true],
      ['some.', false],
      ['.some', false],
      ['some+', false],
      ['.some+', false],
      ['some.nested+', false],
      ['some.nested+other.', false],
      ['some.nested+other+', false],
    ] as const;

    it.each(cases)('takes pattern "%s" and validates to "%s"', (pattern, result) => {
      expect(isValidPropertyPath(pattern)).toBe(result);
    });
  });

  describe('propertyPathWithSiblings', () => {
    const cases = [
      ['some', ['some']],
      ['some.prop', ['some.prop']],
      ['some.prop+with.sibling', ['some.prop', 'with.sibling']],
      ['some.deep.prop+with.sibling', ['some.deep.prop', 'with.sibling']],
      ['some+prop.nested+continue.with.other', ['some', 'prop.nested', 'continue.with.other']],
    ] as const;

    it.each(cases)('parses "%s" and generate tokens: %s', (pattern, result) => {
      expect(propertyPathWithSiblings(pattern)).toStrictEqual(result);
    });
  });

  describe('makePropertyPathTokens', () => {
    const cases = [
      ['some', [['some']]],
      ['some.prop', [['some', 'prop']]],
      [
        'some.prop+with.sibling',
        [
          ['some', 'prop'],
          ['with', 'sibling'],
        ],
      ],
      [
        'some.deep.prop+with.sibling',
        [
          ['some', 'deep', 'prop'],
          ['with', 'sibling'],
        ],
      ],
      [
        'some+prop.nested+continue.with.other',
        [['some'], ['prop', 'nested'], ['continue', 'with', 'other']],
      ],
    ] as const;

    it.each(cases)('parses "%s" and generate tokens: %s', (pattern, result) => {
      expect(makePropertyPathTokens(pattern)).toStrictEqual(result);
    });
  });
});
