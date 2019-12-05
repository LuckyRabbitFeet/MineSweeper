export const types = {
  SET_BEST_SCORE: 'SET_BEST_SCORE'
}

export const actions = {
  setScore: (data) => ({
    type: types.SET_BEST_SCORE,
    data
  })
}

const reduser = (state = '---', action) => {
  switch (action.type) {
    case types.SET_BEST_SCORE:
      return action.data
    default:
      return state
  }
}

export default reduser