import tokens from './tokens'
import { StabConfig } from './types'

const stabs: StabConfig[] = [
    {
        pid: 1,
        lpSymbol: 'STAB',
        lpAddresses: {
            97: '0x6dAb76f34aC8cc56ad5a14AEDe0820684BACc64a',
            56: '',
        },
        token: tokens.stab,
        quoteToken: tokens.stab,
    },
    {
        pid: 2,
        lpSymbol: 'rSTAB',
        lpAddresses: {
            97: '0x6dAb76f34aC8cc56ad5a14AEDe0820684BACc64a',
            56: '',
        },
        token: tokens.rStab,
        quoteToken: tokens.rStab,
    },
    {
        pid: 3,
        lpSymbol: 'gSTAB',
        lpAddresses: {
            97: '0x6dAb76f34aC8cc56ad5a14AEDe0820684BACc64a',
            56: '',
        },
        token: tokens.govStab,
        quoteToken: tokens.govStab,
    },
]

export default stabs
