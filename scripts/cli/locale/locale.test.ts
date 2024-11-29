import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { vol } from 'memfs';

const { mockAddProperty, mockUpdateProperty, mockRemoveProperty, mockMoveProperty } = vi.hoisted(
  () => ({
    mockAddProperty: vi.fn(),
    mockUpdateProperty: vi.fn(),
    mockRemoveProperty: vi.fn(),
    mockMoveProperty: vi.fn(),
  }),
);

vi.mock('./utils/object', async (importOriginal) => {
  const utils = await importOriginal<typeof import('./utils/object')>();

  return {
    ...utils,
    addProperty: mockAddProperty,
    updateProperty: mockUpdateProperty,
    removeProperty: mockRemoveProperty,
    moveProperty: mockMoveProperty,
  };
});

/**
 * Mock fs everywhere else with the memfs version.
 * @see https://kschaul.com/til/2024/06/26/mock-fs-with-vitest-and-memfs/
 */
vi.mock('node:fs', async () => {
  const memfs = await vi.importActual<typeof import('memfs')>('memfs');

  // Support both `import fs from "fs"` and "import { readFileSync } from "fs"`
  return {
    default: memfs.fs,
    ...memfs.fs,
  };
});

async function runCommand(...args: string[]) {
  process.argv = ['node', 'locale.ts', ...args];

  return import('./locale');
}

const localesFolder = `${process.cwd()}/src/i18n/locales`;

describe('locale', () => {
  let originalArgv = [''];

  beforeEach(() => {
    vi.resetModules();

    originalArgv = process.argv;

    vol.fromNestedJSON({
      [localesFolder]: {
        //'en.json': '{ "name": "Jero" }',
        'en.json': '{}',
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    vol.reset();

    process.argv = originalArgv;
  });

  describe('add', () => {
    it('should execute "add" command with a single property', async () => {
      await runCommand('-a', '-p', 'some');

      expect(mockAddProperty).toHaveBeenCalledWith({}, 'some');
    });

    it('should execute "add" command with multiple properties', async () => {
      await runCommand('-a', '-p', 'some', 'sibling');

      expect(mockAddProperty).toHaveBeenCalledWith({}, 'some+sibling');
    });

    it('should execute "add" command with multiple properties with nested properties', async () => {
      await runCommand('-a', '-p', 'some.nested', 'sibling');

      expect(mockAddProperty).toHaveBeenCalledWith({}, 'some.nested+sibling');
    });
  });

  describe('update', () => {
    it('should execute "update" command', async () => {
      await runCommand('-u', '-p=some', '-v=foo');

      expect(mockUpdateProperty).toHaveBeenCalledWith({}, 'some', 'foo');
    });
  });

  describe('remove', () => {
    it('should execute "remove" command', async () => {
      await runCommand('-r', '-p=some');

      expect(mockRemoveProperty).toHaveBeenCalledWith({}, 'some');
    });
  });

  describe('move', () => {
    it('should execute "move" command', async () => {
      await runCommand('-m', '-p', 'from', 'to');

      expect(mockMoveProperty).toHaveBeenCalledWith({}, 'from', 'to');
    });
  });
});
