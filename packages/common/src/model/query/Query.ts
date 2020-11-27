import { VehicleActivityType } from '../schema'

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
  field: keyof VehicleActivityType
  value: any
}

export interface Sort {
  field: keyof VehicleActivityType
  desc?: boolean
}

interface Pagination {
  size: number
  start: number
  total?: number
}

export interface QuerySet {
  page: Pagination
  sort?: Sort[]
  predicates: Predicate[]
}

export interface QueryResult {
  page: Pagination
  results: VehicleActivityType[]
}

export function decodeRequest(body: any): QuerySet {
  return {
    page: body.page ?? { size: 100, start: 0 },
    sort: body.sort ?? undefined,
    predicates: body.predicates
  }
}
