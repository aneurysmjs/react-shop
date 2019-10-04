import { renderHook } from '~/shared/utils/testing/renderHook';

import useLazy from './useLazy';

type DynamicModule = () => Promise<typeof import('./Example')>;

const getModule: DynamicModule = () => import('./Example');

describe('LazyComponent', () => {
  it('should render "null" at first', () => {
    const { result } = renderHook(() => useLazy(getModule));
    expect(result.current).toEqual(null);
  });
});
