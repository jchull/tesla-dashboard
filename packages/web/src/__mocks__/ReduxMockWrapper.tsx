import React from 'react';
import thunk from 'redux-thunk';

import configureMockStore from 'redux-mock-store';

import { AppState } from '@teslapp/web/src/store';
import services from '@teslapp/web/src/service';
import { Provider } from 'react-redux';

jest.mock('@teslapp/web/src/service');

export const getMockProvider = (partialState: Partial<AppState>) => {
  const mockStore = configureMockStore([
    thunk.withExtraArgument({ api: services })
  ]);

  const store = mockStore(partialState);

  return {
    ReduxMockWrapper: ({ children }: { children: React.ReactNode }) => (
      <Provider store={store}>{children}</Provider>
    ),
    store
  };
};
