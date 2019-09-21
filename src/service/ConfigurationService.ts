export enum ConfigurationKeys {
  REACT_APP_API_ROOT = 'API_ROOT',
  REACT_APP_COOKIE_SECRET = 'COOKIE_SECRET'
}

const env = process.env;

export type ConfigurationKeysType = keyof typeof ConfigurationKeys;

/**
 * Loads configuration from:
 * 1. .env files
 * 2. api config via REST
 *
 */
export class ConfigurationService {

  private readonly values: Map<ConfigurationKeysType, string>;

  constructor() {
    this.values = new Map<ConfigurationKeysType, string>();
    // TODO: load local env configuration first
    for (let configurationKey in ConfigurationKeys) {
      const val = env[configurationKey];
      if (val) {
        this.values.set(configurationKey as ConfigurationKeysType, val);
      }
    }

    // TODO: load DB configuration overrides and additions
  }

  get(key: ConfigurationKeysType): string | undefined {
    return this.values.get(key);
  }

}
