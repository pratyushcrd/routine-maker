import { APP_LOAD, NEXT_SCREEN, PREVIOUS_SCREEN, } from 'constants/action-types'

const initialState = {
  loaded: false,
  currentScreen: 0,
}

export default function app(state = initialState, action) {
  switch (action.type) {
  case APP_LOAD:
    return { ...state, loaded: true, }
  case NEXT_SCREEN:
    return { ...state, currentScreen: (state.currentScreen >= 0 ? state.currentScreen  + 1 : 0), }
  case PREVIOUS_SCREEN:
    return { ...state, currentScreen: (state.currentScreen >= 0 ? state.currentScreen  - 1 : 0), }
  default:
    return state
  }
}
