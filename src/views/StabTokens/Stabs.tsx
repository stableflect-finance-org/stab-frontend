import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text } from '@stableflect/uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useStabs, usePriceCakeBusd, useGetApiPrices } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchStabUserDataAsync } from 'state/actions'
import { Stab } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApy } from 'utils/apy'
import { orderBy } from 'lodash'

import StabCard, { StabWithStakedValue } from './components/StabCard/StabCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Header = styled.div`
  padding: 32px 0px;
  background: ${({ theme }) => theme.colors.gradients.bubblegum};

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Stabs: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const stabsLP = useStabs()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchStabUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeStabs = stabsLP.filter((stab) => stab.pid !== 0 && stab.multiplier !== '0X')
  const inactiveStabs = stabsLP.filter((stab) => stab.pid !== 0 && stab.multiplier === '0X')

  const stakedOnlyStabs = activeStabs.filter(
    (stab) => stab.userData && new BigNumber(stab.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveStabs = inactiveStabs.filter(
    (stab) => stab.userData && new BigNumber(stab.userData.stakedBalance).isGreaterThan(0),
  )

  const sortStabs = (stabs: StabWithStakedValue[]): StabWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(stabs, (stab: StabWithStakedValue) => stab.apy, 'desc')
      case 'multiplier':
        return orderBy(
          stabs,
          (stab: StabWithStakedValue) => (stab.multiplier ? Number(stab.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(stabs, (stab: StabWithStakedValue) => (stab.userData ? stab.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(stabs, (stab: StabWithStakedValue) => Number(stab.liquidity), 'desc')
      default:
        return stabs
    }
  }

  const stabsList = useCallback(
    (stabsToDisplay: Stab[]): StabWithStakedValue[] => {
      let stabsToDisplayWithAPY: StabWithStakedValue[] = stabsToDisplay.map((stab) => {
        if (!stab.lpTotalInQuoteToken || !prices) {
          return stab
        }

        const quoteTokenPriceUsd = prices[stab.quoteToken.symbol.toLowerCase()]
        const totalLiquidity = new BigNumber(stab.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apy = isActive ? getFarmApy(stab.poolWeight, cakePrice, totalLiquidity) : 0

        return { ...stab, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        stabsToDisplayWithAPY = stabsToDisplayWithAPY.filter((stab: StabWithStakedValue) => {
          return stab.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return stabsToDisplayWithAPY
    },
    [cakePrice, prices, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  let stabsStaked = []
  if (isActive) {
    stabsStaked = stakedOnly ? stabsList(stakedOnlyStabs) : stabsList(activeStabs)
  } else {
    stabsStaked = stakedOnly ? stabsList(stakedInactiveStabs) : stabsList(inactiveStabs)
  }

  stabsStaked = sortStabs(stabsStaked)

  const rowData = stabsStaked.map((stab) => {
    const { token, quoteToken } = stab
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = stab.lpSymbol && stab.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: stab.apy && stab.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: stab.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: stab.apy,
      },
      farm: {
        image: stab.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: stab.pid,
      },
      earned: {
        earnings: stab.userData ? getBalanceNumber(new BigNumber(stab.userData.earnings)) : null,
        pid: stab.pid,
      },
      liquidity: {
        liquidity: stab.liquidity,
      },
      multiplier: {
        multiplier: stab.multiplier,
      },
      details: stab,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stabsStaked.map((stab) => (
              <StabCard key={stab.pid} stab={stab} cakePrice={cakePrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {stabsStaked.map((stab) => (
              <StabCard key={stab.pid} stab={stab} cakePrice={cakePrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Header>
        <Heading as="h1" size="xxl" color="secondary" mb="24px">
          {TranslateString(674, 'Farms')}
        </Heading>
        <Heading size="lg" color="text">
          {TranslateString(999, 'Stake Liquidity Pool (LP) tokens to earn.')}
        </Heading>
      </Header>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              <Text> {TranslateString(1116, 'Staked only')}</Text>
            </ToggleWrapper>
            <FarmTabButtons />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text>SORT BY</Text>
              <Select
                options={[
                  {
                    label: 'Hot',
                    value: 'hot',
                  },
                  {
                    label: 'APR',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        <StyledImage src="/images/3dpan.png" alt="Pancake illustration" width={120} height={103} />
      </Page>
    </>
  )
}

export default Stabs
