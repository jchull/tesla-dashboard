export interface UserPreferences {
  _id?: string;
  username: string;

  displayCurrencyCode: string;
  displayDistanceUnits: 'mi' | 'km';
  displayTempUnits: 'F' | 'C';
}


export const DEFAULT_PREFERENCES: UserPreferences = {
  username: 'default',
  displayDistanceUnits: 'mi',
  displayCurrencyCode: 'USD',
  displayTempUnits: 'F'
};
