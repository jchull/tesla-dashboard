import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import { ProductActionType } from './actions';
import services from '@teslapp/web/src/service';
import { Product } from '@teslapp/common';

jest.mock('@teslapp/web/src/service');

const sampleCar: Product = {
  battery_level: 0,
  battery_range: 0,
  calendar_enabled: false,
  car_type: '',
  display_name: '',
  id_s: '',
  last_session_id: '',
  option_codes: '',
  state: '',
  timestamp: 0,
  vehicle_id: 0,
  vin: '9999',
  _id: '7',
  api_version: 1
};

const mockStore = configureMockStore([
  thunk.withExtraArgument({ api: services })
]);

describe('product actions', () => {
  it('should handle empty list', async () => {
    services.queryService.getProducts = jest.fn(
      (): Promise<Product[]> => {
        return new Promise<Product[]>((resolve, reject) => resolve([]));
      }
    );
    const store = mockStore({ products: undefined });
    const expectedActions = [
      { type: ProductActionType.FETCH_PRODUCT_LIST__START, payload: undefined },
      {
        type: ProductActionType.FETCH_PRODUCT_LIST__SUCCESS,
        payload: { productList: [] }
      }
    ];

    // @ts-ignore
    await store.dispatch(actions.fetchProductListAction());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle simple product list', async () => {
    services.queryService.getProducts = jest.fn(
      (): Promise<Product[]> => {
        return new Promise<Product[]>((resolve, reject) =>
          resolve([sampleCar])
        );
      }
    );
    const store = mockStore({ products: undefined });
    const expectedActions = [
      { type: ProductActionType.FETCH_PRODUCT_LIST__START, payload: undefined },
      {
        type: ProductActionType.FETCH_PRODUCT_LIST__SUCCESS,
        payload: { productList: [sampleCar] }
      }
    ];

    // @ts-ignore
    await store.dispatch(actions.fetchProductListAction());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
