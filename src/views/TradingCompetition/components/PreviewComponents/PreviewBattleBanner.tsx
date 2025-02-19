import React from 'react'
import { Flex, Heading, Image } from '@stableflect/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import AllBunniesImage from '../../pngs/all-bunnies.png'
import { Heading1Text, Heading2Text } from '../CompetitionHeadingText'

const ImageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`

const StyledHeading1Text = styled(Heading1Text)`
  text-align: center;
`

const StyledHeading2Text = styled(Heading2Text)`
  text-align: center;
`

const StyledHeading = styled(Heading)`
  text-align: center;
`

const BattleBanner = () => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <ImageWrapper>
        <Image src={AllBunniesImage} alt="all the bunnies" width={1208} height={659} responsive />
      </ImageWrapper>
      <StyledHeading1Text>{TranslateString(999, 'Easter Battle')}</StyledHeading1Text>
      <StyledHeading2Text background="linear-gradient(180deg, #FFD800 0%, #EB8C00 100%)" fill>
        {TranslateString(999, '$200,000 in Prizes!')}
      </StyledHeading2Text>
      <StyledHeading size="md" color="inputSecondary" mt="16px">
        {TranslateString(999, 'Registration starting April 5th')}
      </StyledHeading>
    </Flex>
  )
}

export default BattleBanner
