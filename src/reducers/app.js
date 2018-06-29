import { APP_LOAD, NEXT_SCREEN, PREVIOUS_SCREEN, SET_SCREEN, } from 'constants/action-types'
import pages from 'constants/app-pages'
import { createReducer } from './utils'

const initialState = {
  loaded: false,
  currentScreen: 0,
}

const handler = {
  [APP_LOAD]: () => ({ loaded: true, }),
  [NEXT_SCREEN]: (state) => (
    { currentScreen: (state.currentScreen + (1 + pages.length)) % pages.length }
  ),
  [PREVIOUS_SCREEN]: (state) => (
    { currentScreen: (state.currentScreen - (1 + pages.length)) % pages.length }
  ),
  [SET_SCREEN]: (state, action) => {
    return { currentScreen: action.screen }
  },
}

export default createReducer(initialState, handler)
