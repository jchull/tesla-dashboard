import { Entity } from './common'

export interface UserPreferences extends Entity {
  username: string
  displayCurrencyCode: string
  displayDistanceUnits: 'mi' | 'km'
  displayTempUnits: 'F' | 'C'
}


