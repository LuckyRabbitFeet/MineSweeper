export const types = {
  MINES: 'SET_MINES'
}

export const actions = {
  setNumberOfMines: (data) => ({
    type: types.MINES,
    data
  })
}

const reduser = (state = 40, action) => {
  switch (action.type) {
    case types.MINES:
      return action.data
    default:
      return state
  }
}

export default reduser