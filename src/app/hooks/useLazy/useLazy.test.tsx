/* eslint-disable */
// $FlowFixMe
import { renderHook } from '~/shared/utils/testing/renderHook';

import useLazy from './useLazy';

const getModule = () => import('./Example');

describe('LazyComponent', () => {
  it('should render "null" at first', () => {
    const { result } = renderHook(() => useLazy(getModule, false));
    expect(result.current).toEqual(null);
  });
});
