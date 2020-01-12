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

    const getModule = (): Promise<typeof reduxModule> => Promise.resolve(reduxModule);
    const alienModule = {
      id: 'with',
      getModule,
    };
    const { result, waitForNextUpdate } = renderHook(() => withAlien(Example, alienModule), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.props.reducers).toBe(undefined);
    expect(result.current.props.actions).toStrictEqual(reduxModule.actions);
  });
});
