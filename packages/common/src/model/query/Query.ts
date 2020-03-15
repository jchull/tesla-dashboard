import {SessionType} from '../util';

export enum Operator {
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


export interface Predicate {
  priority: number,
  operator: Operator,
  field: keyof SessionType,
  value: any
}

export interface Sort {
  field: keyof SessionType,
  desc: boolean,
  priority: number
}

interface Pagination {
  itemsPerPage: number,
  currentPage?: number
}


export interface QuerySet {
  type: "session" | "charge" | "drive",
  page: Pagination,
  sort?: [Sort],
  predicates: [Predicate]
}

export interface QueryResult {
  total: number,
  count: number,
  page: Pagination,
  results: SessionType[]
}


export function decodeRequest(body:any): QuerySet {
  return {
    type: body.type,
    page: body.page ?? {itemsPerPage: 100, currentPage: 0},
    sort: body.sort ?? undefined,
    predicates: body.predicates
  }
}

export function encodeResponse(result: [any]): QueryResult {
  return {count: result.length, page: {currentPage: 0, itemsPerPage: 100}, results: result, total: 0}
}

