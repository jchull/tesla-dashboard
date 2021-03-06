import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { SessionActionType } from './actions';
import services from '@tesla-dashboard/web/service';

jest.mock('service/service');

const mockStore = configureMockStore([thunk.withExtraArgument({ api: services })]);

describe('session actions', () => {
  it('should handle empty session list', async () => {
    services.queryService.getRecentSessions = jest.fn(
      (vin): Promise<VehicleActivity[]> => {
        return new Promise<VehicleActivity[]>((resolve, reject) => resolve());
      }
    );
    const store = mockStore({ product: {} });
    const expectedActions = [
      { type: SessionActionType.FETCH_SESSION_LIST__START, payload: undefined },
      {
        type: SessionActionType.FETCH_SESSION_LIST__SUCCESS,
        payload: { sessions: undefined },
      },
    ];

    // eslint-disable-next-line
    // @ts-ignore
    await store.dispatch(actions.fetchSessionListAction('999'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
