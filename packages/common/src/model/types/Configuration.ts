import { Entity } from './common'

export interface Configuration extends Entity {
  apiPort: number
  ownerBaseUrl: string
  teslaClientKey: string
  teslaClientSecret: string
}
