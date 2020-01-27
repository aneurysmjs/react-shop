import React, { ReactElement } from 'react';
import { Store } from 'redux';
import { renderHook } from '@testing-library/react-hooks';

import alien from './alien';

import withAlien from './withAlien';

import { reduxModule } from './helpers/modules';
import { withProvider, WrapperType } from './helpers/withProvider';

let store = {} as Store;

let wrapper: WrapperType;

beforeEach(() => {
  store = alien();
  wrapper = withProvider(store);
});

describe('test "withAlien"', () => {
  it('should resolve and alien module and add actions to the Component', async () => {
    const Example = (): ReactElement => <div>some component</div>;

    const reduxModules = [(): Promise<typeof reduxModule> => Promise.resolve(reduxModule)];

    const { result, waitForNextUpdate } = renderHook(() => withAlien(Example, reduxModules), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.props.modules).toHaveLength(1);
  });
});
