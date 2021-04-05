import farmsConfig from './farms'
import stabsConfig from './stabs'

const communityFarms = farmsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.token.symbol)
const communityStabs = stabsConfig.filter((farm) => farm.isCommunity).map((farm) => farm.token.symbol)

export { farmsConfig, communityFarms }
export { stabsConfig, communityStabs }
export { default as poolsConfig } from './pools'
export { default as ifosConfig } from './ifo'
