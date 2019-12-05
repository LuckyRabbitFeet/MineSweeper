export const types = {
  SET_TIMER: 'SET_TIMER'
}

export const actions = {
  setTimer: (data) => ({
    type: types.TIMER,
    data
  })
}

const reduser = (state = 'stop', action) => {
  switch (action.type) {
    case types.SET_TIMER:
      return action.data
    default:
      return state
  }
}

export default reduser