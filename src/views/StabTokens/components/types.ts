export type TableProps = {
  data?: TableDataTypes[]
  selectedFilters?: string
  sortBy?: string
  sortDir?: string
  onSort?: (value: string) => void
}

export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  translationId: number
  sortable: boolean
}

export type ScrollBarProps = {
  ref: string
  width: number
}

export type TableDataTypes = {
  POOL: string
  APY: string
  EARNED: string
  STAKED: string
  DETAILS: string
  LINKS: string
}

export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'yourTokens',
    translationId: 1072,
    sortable: true,
    label: 'Amount',
  },
  {
    id: 3,
    name: 'currentPrice',
    translationId: 736,
    sortable: true,
    label: 'Market Price',
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'farm',
    translationId: 999,
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'yourTokens',
    translationId: 1072,
    sortable: true,
    label: 'Amount',
  },
  {
    id: 3,
    name: 'currentPrice',
    translationId: 736,
    sortable: true,
    label: 'Market Price',
  },
  {
    id: 4,
    name: 'currentGovPrice',
    translationId: 999,
    sortable: true,
    label: 'Price Per Gov',
  },
  {
    id: 5,
    name: 'rebaseMultiplier',
    translationId: 999,
    sortable: true,
    label: 'Rebase Multiplier',
  },
  {
    id: 6,
    name: 'details',
    translationId: 999,
    sortable: true,
    label: '',
  },
]

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}
