export enum SettingsType {
  'IFO' = 'IFO',
  'POOL' = 'POOL',
  'FARM' = 'FARM',
  'STAB' = 'STAB',
}

export interface SettingsObject {
  name: string
  url: string
  type: SettingsType
}
