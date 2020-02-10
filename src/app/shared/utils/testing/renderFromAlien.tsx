import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { ReactElement } from 'react';
import { act } from 'react-test-renderer';
import alien, { AlienStore } from '~/store/config/alienStore/alien';
import { withProvider, WrapperType } from '~/store/config/alienStore/helpers/withProvider';
import { State } from '~/store/State';


const store = alien<State>();

const wrapper = withProvider(store);

export interface RenderFromAlienResult extends RenderHookResult<any, ReactElement> {
  store: AlienStore;
  wrapper: WrapperType;
}

export default async function renderWithAlien(
  Ui: () => ReactElement,
): Promise<RenderFromAlienResult> {
  let hookResult = {} as RenderHookResult<any, ReactElement>;

  await act(async () => {
    hookResult = renderHook(Ui, { wrapper });
  });

  return {
    ...hookResult,
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
    // Redux Provider with store already given from alien.
    wrapper,
  };
}
