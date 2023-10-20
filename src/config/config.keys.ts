/**
 * @description Enum for configuration keys
 * @enum {string}
 * @readonly
 */
export enum Configuration {
  PORT = 'PORT',
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_NAME = 'DB_NAME',
  DB_SSL = 'DB_SSL',
}

/**
 * @description Enum for Blockchain keys
 * @enum {string}
 * @readonly
 */
export enum Blockchain {
  PROVIDER_URL = 'PROVIDER_URL',
  CONTRACT_ADDRESS = 'CONTRACT_ADDRESS',
  ABI = 'ABI',
}
