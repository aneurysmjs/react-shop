/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks';

describe('error hook tests', () => {
  function useError(obj: Error | string): boolean {
    if (obj.constructor.name === 'Error') {
      // console.log('is a mudafocka err', err);
      throw new Error(obj);
    }
    return obj;
  }

  const resolvedPromise = (): Promise<string> => Promise.resolve('good');
  const rejectedPromise = (): Promise<void> => import('/some/bad/file.js');

  function useAsyncError(fuckingPromise: () => Promise<any>): boolean {
    const [value, setValue] = useState();
    useEffect(() => {
      (async (): Promise<void> => {
        try {
          const result = await fuckingPromise();
          setValue(result);
        } catch (err) {
          // console.log('is a mudafocka err', err);
          // setthrow new Error('fuck imports');
          setValue(err);
        }
      })();
    }, [fuckingPromise]);

    return useError(value);
  }

  test('should raise async error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncError(rejectedPromise));

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error(`Error: Cannot find module '/some/bad/file.js' from 'dummy.test.tsx'`));
  });

  test('should capture async error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncError(rejectedPromise));

    await waitForNextUpdate();

    expect(result.error).toEqual(
      Error(`Error: Cannot find module '/some/bad/file.js' from 'dummy.test.tsx'`),
    );
  });

  test('should not capture async error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAsyncError(resolvedPromise));

    await waitForNextUpdate();

    expect(result.current).not.toBe(undefined);
    expect(result.error).toBe(undefined);
  });

  test('should reset async error', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      prevPromise => useAsyncError(prevPromise),
      {
        initialProps: rejectedPromise,
      },
    );

    await waitForNextUpdate();

    expect(result.error).not.toBe(undefined);

    rerender(resolvedPromise);

    await waitForNextUpdate();

    expect(result.current).not.toBe(undefined);
    expect(result.error).toBe(undefined);
  });
});
