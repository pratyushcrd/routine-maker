import { APP_LOAD, NEXT_SCREEN, PREVIOUS_SCREEN, SET_SCREEN } from 'constants/action-types'

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

export function setScreen(screen) {
  return {
    type: SET_SCREEN,
    screen,
  }
}
