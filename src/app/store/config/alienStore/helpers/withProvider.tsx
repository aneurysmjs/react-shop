import React, { ReactNode, ComponentType } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

type WrapperProps = {
  children?: ReactNode;
};

export type WrapperType = ComponentType<WrapperProps>;

type WithProviderType = (store: Store) => WrapperType;

/* eslint-disable-next-line import/prefer-default-export, @typescript-eslint/explicit-function-return-type */
export const withProvider: WithProviderType = store => ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
