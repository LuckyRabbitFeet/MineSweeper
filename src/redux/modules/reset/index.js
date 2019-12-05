export const types = {
  RESET: 'RESET'
}

export const actions = {
  reset: (data) => ({
    type: types.RESET,
    data
  })
}

const reduser = (state = false, action) => {
  switch (action.type) {
    case types.RESET:
      return action.data
    default:
      return state
  }
}

export default reduser