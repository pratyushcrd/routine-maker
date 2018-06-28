import { APP_LOAD, NEXT_SCREEN, PREVIOUS_SCREEN, } from 'constants/action-types'

export function loadApp() {
  return {
    type: APP_LOAD,
  }
}

export function nextScreen() {
  return {
    type: NEXT_SCREEN,
  }
}

export function previousScreen() {
  return {
    type: PREVIOUS_SCREEN,
  }
}

export default { loadApp, nextScreen, previousScreen}
