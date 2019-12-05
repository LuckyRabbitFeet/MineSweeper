export const types = {
  GAME_LEVEL: 'GAME_LEVEL'
}

export const actions = {
  setLevel: (data) => ({
    type: 'GAME_LEVEL',
    data
  })
}

const reducer = (state = 'normal', action) => {
  switch (action.type) {
    case types.GAME_LEVEL:
      return action.data
    default:
      return state
  }
}

export default reducer