/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import stabsConfig from 'config/constants/stabs'
import fetchStabs from './fetchStabs'
import {
  fetchStabUserEarnings,
  fetchStabUserAllowances,
  fetchStabUserTokenBalances,
  fetchStabUserStakedBalances,
} from './fetchStabUser'
import { StabsState, Stab } from '../types'

const initialState: StabsState = { data: [...stabsConfig] }

export const stabsSlice = createSlice({
  name: 'Stabs',
  initialState,
  reducers: {
    setStabsPublicData: (state, action) => {
      const liveStabsData: Stab[] = action.payload
      state.data = state.data.map((stab) => {
        const liveStabData = liveStabsData.find((f) => f.pid === stab.pid)
        return { ...stab, ...liveStabData }
      })
    },
    setStabsUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setStabsPublicData, setStabsUserData } = stabsSlice.actions

// Thunks
export const fetchStabsPublicDataAsync = () => async (dispatch) => {
  const stabs = await fetchStabs()
  dispatch(setStabsPublicData(stabs))
}
export const fetchStabUserDataAsync = (account) => async (dispatch) => {
  const userStabAllowances = await fetchStabUserAllowances(account)
  const userStabTokenBalances = await fetchStabUserTokenBalances(account)
  const userStakedBalances = await fetchStabUserStakedBalances(account)
  const userStabEarnings = await fetchStabUserEarnings(account)

  const arrayOfUserDataObjects = userStabAllowances.map((farmAllowance, index) => {
    return {
      index,
      allowance: userStabAllowances[index],
      tokenBalance: userStabTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userStabEarnings[index],
    }
  })

  dispatch(setStabsUserData({ arrayOfUserDataObjects }))
}

export default stabsSlice.reducer
