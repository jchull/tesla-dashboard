import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import {AuthActionType} from './actions';
import services from '@service/service';

jest.mock('@service/service');

services.auth.login = jest.fn((username, password): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => username === 'test1' ? resolve(true) : reject());
});

const mockStore = configureMockStore([thunk.withExtraArgument({api: services})]);

describe('auth actions', () => {

  beforeEach(() => {
  });

  afterEach(() => {
  });


  it('should handle login', async () => {
    const store = mockStore({loggedIn: false});
    const expectedActions = [
      {type: AuthActionType.AUTH_LOGIN__START, payload: undefined},
      {type: AuthActionType.AUTH_LOGIN__SUCCESS, payload: {username: 'test1', role: 'temp'}}
    ];

    // @ts-ignore
    await store.dispatch(actions.loginAction('test1', '123456'));
    expect(store.getActions()).toEqual(expectedActions);

    // TODO: testing of reducer
  });
});