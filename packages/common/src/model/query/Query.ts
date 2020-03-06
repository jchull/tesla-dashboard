import {ChargeSessionType} from '../ChargeSession';
import {DriveSessionType} from '../DriveSession';

export enum QueryType {
  EQ = 'EQ',
  GT = 'GT',
  LT = 'LT',
  GTE = 'GTE',
  LTE = 'LTE',
  IN = 'IN',
  EX = 'EX',
  BEFORE = 'BEFORE',
  AFTER = 'AFTER'
}


export interface QueryItem<T> {
  priority: number,
  type: QueryType,
  field: keyof T,
  value: any
}

export interface QuerySort<T> {
  field: keyof T,
  desc: boolean,
  priority: number
}

interface QueryPage {
  itemsPerPage: number,
  currentPage?: number
}


export interface Query<T extends ChargeSessionType | DriveSessionType> {
  type: "session" | "charge" | "drive",
  page: QueryPage,
  sort?: [QuerySort<T>],
  items: [QueryItem<T>]
}

export interface QueryResult<T extends ChargeSessionType | DriveSessionType> {
  total: number,
  count: number,
  page: QueryPage,
  results: T[]
}


export function parseRequest<T extends ChargeSessionType | DriveSessionType>(body:any): Query<T> {
  return {
    type: body.type,
    page: body.page ?? {itemsPerPage: 100, currentPage: 0},
    sort: body.sort ?? undefined,
    items: body.items
  }
}

