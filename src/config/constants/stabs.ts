import tokens from './tokens'
import { StabConfig } from './types'

const stabs: StabConfig[] = [
    {
        pid: 0,
        lpSymbol: 'STAB',
        lpAddresses: {
            97: '0x6dAb76f34aC8cc56ad5a14AEDe0820684BACc64a',
            56: '',
        },
        token: tokens.stab,
        quoteToken: tokens.stab,
    },
    {
        pid: 1,
        lpSymbol: 'rSTAB',
        lpAddresses: {
            97: '0x6dAb76f34aC8cc56ad5a14AEDe0820684BACc64a',
            56: '',
        },
        token: tokens.rStab,
        quoteToken: tokens.rStab,
    },
]

export default stabs
