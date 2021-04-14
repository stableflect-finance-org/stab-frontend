import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'

export interface AmountProps {
  earnings: number
  pid: number
}

const AmountSpan = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? theme.colors.text : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`

const Amount: React.FunctionComponent<AmountProps> = ({ earnings }) => {
  const { account } = useWeb3React()
  const amountEarned = account ? earnings : null

  const displayBalance = amountEarned ? amountEarned.toLocaleString() : '?'
  return <AmountSpan earned={amountEarned}>{displayBalance}</AmountSpan>
}

export default Amount
