import {IVehicle, IVehicleSession} from 'tesla-dashboard-api';

export enum ACTION_TYPES {
  DELETE_SESSION = 'DELETE_SESSION',
  ARCHIVE_SESSION = 'ARCHIVE_SESSION',
  UPDATE_SESSION_LIST = 'UPDATE_SESSION_LIST',
  FILTER_SESSION_LIST = 'FILTER_SESSION_LIST',
  UPDATE_PRODUCT_LIST = 'UPDATE_PRODUCTS_LIST'
}

export interface IAction {
  type: ACTION_TYPES
}

export interface ProductListAction extends IAction {
  productList: IVehicle[]
}

export interface UpdateProductList extends ProductListAction {
  type: ACTION_TYPES.UPDATE_PRODUCT_LIST
}

export interface SessionListAction extends IAction {
  sessionList: IVehicleSession[],
  sessionId: string
}

export interface DeleteSessionAction extends SessionListAction {
  type: ACTION_TYPES.DELETE_SESSION
}

export interface ArchiveSessionAction extends SessionListAction {
  type: ACTION_TYPES.ARCHIVE_SESSION
}
