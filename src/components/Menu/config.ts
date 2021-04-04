import { MenuEntry } from '@stableflect/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://app.stableflect.finance',
      },
      {
        label: 'Liquidity',
        href: 'https://app.stableflect.finance/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    items: [
      {
        label: 'Leaderboard',
        href: '/teams',
      },
      {
        label: 'Task Center',
        href: '/profile/tasks',
      },
      {
        label: 'Your Profile',
        href: '/profile',
      },
    ],
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://stableflect.finance',
      },
      {
        label: 'Tokens',
        href: 'https://stableflect.finance/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://stableflect.finance/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://stableflect.finance/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/stableflect',
      },
      {
        label: 'Docs',
        href: 'https://stableflect.finance/docs',
      },
      {
        label: 'Blog',
        href: 'https://stableflect.medium.com',
      },
      {
        label: 'Merch',
        href: 'https://pancakeswap.creator-spring.com/',
      },
    ],
  },
]

export default config
