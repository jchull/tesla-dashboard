import { Entity } from './common'

export interface TeslaAccount extends Entity {
  token_created_at?: number
  token_expires_in?: number
  refresh_token?: string
  access_token?: string
  email: string
  username?: string
  account_status?: string
  password?: string
}
