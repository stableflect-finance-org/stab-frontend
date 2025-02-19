import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text } from '@stableflect/uikit'
import { StabWithStakedValue } from 'views/StabTokens/components/StabCard/StabCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityStabs } from 'config/constants'
import { CommunityTag, CoreTag, DualTag } from 'components/Tags'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import CurrentPrice, { CurrentPriceProps } from '../CurrentPrice'
import RebaseMultiplier, { RebaseMultiplierProps } from '../RebaseMultiplier'
import CurrentGovPrice, { CurrentGovPriceProps } from '../CurrentGovPrice'

export interface ActionPanelProps {
  currentPrice: CurrentPriceProps
  rebaseMultiplier: RebaseMultiplierProps
  currentGovPrice: CurrentGovPriceProps
  details: StabWithStakedValue
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, currentPrice, rebaseMultiplier, currentGovPrice }) => {
  const farm = details

  const TranslateString = useI18n()
  const isActive = farm.multiplier !== '0X'
  const { quoteToken, token, dual } = farm
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: quoteToken.address,
    tokenAddress: token.address,
  })
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = `https://bscscan.com/address/${lpAddress}`
  const info = `https://pancakeswap.info/pair/${lpAddress}`
  const isCommunityFarm = communityStabs.includes(token.symbol)

  return (
    <Container>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={`https://exchange.pancakeswap.finance/#/add/${liquidityUrlPathParts}`}>
              {TranslateString(999, `Get ${lpLabel}`, { name: lpLabel })}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc}>{TranslateString(999, 'View Contract')}</StyledLinkExternal>
        <StyledLinkExternal href={info}>{TranslateString(999, 'See Pair Info')}</StyledLinkExternal>
        <TagsContainer>
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          {dual ? <DualTag /> : null}
        </TagsContainer>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text>{TranslateString(736, 'Current Price')}</Text>
          <CurrentPrice {...currentPrice} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Rebase Multiplier')}</Text>
          <RebaseMultiplier {...rebaseMultiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Current Gov Price')}</Text>
          <CurrentGovPrice {...currentGovPrice} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction {...farm} />
        <StakedAction {...farm} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
