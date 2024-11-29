import { describe, it, vi, beforeEach, afterEach } from 'vitest';

async function runCommand(...args: string[]) {
  process.argv = ['node', 'cli.ts', ...args];

  return import('./cli');
}

describe('cli', () => {
  let originalArgv = [''];

  beforeEach(() => {
    vi.resetModules();

    // Each test overwrites process arguments so store the original arguments
    originalArgv = process.argv;
  });

  afterEach(() => {
    vi.resetAllMocks();

    // Set process arguments back to the original value
    process.argv = originalArgv;
  });

  it('should execute "locale" command', async () => {
    await runCommand('locale');
  });
});
