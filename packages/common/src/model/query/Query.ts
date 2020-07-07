import { SessionType } from '../util'

export enum Operator {
  EQ = 'EQ',
  GT = 'GT',
  LT = 'LT',
  GTE = 'GTE',
  LTE = 'LTE',
  IN = 'IN',
  EX = 'EX',
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

export interface Predicate {
  operator: Operator
  field: keyof SessionType
  value: any
}

export interface Sort {
  field: keyof SessionType
  desc?: boolean
}

interface Pagination {
  size: number
  start: number
  total?: number
}

export interface QuerySet {
  type: 'session' | 'charge' | 'drive'
  page: Pagination
  sort?: [Sort]
  predicates: [Predicate]
}

export interface QueryResult {
  page: Pagination
  results: SessionType[]
}

export function decodeRequest(body: any): QuerySet {
  return {
    type: body.type,
    page: body.page ?? { size: 100, start: 0 },
    sort: body.sort ?? undefined,
    predicates: body.predicates,
  }
}
