import { initMatrix } from '../../../utils/matrix'

const initState = initMatrix(14, 18)

export const types = {
  MATRIX: 'SET_MATRIX'
}

export const actions = {
  setMatrix: (data) => ({
    type: types.MATRIX,
    data
  })
}

const reduser = (state = initState, action) => {
  switch (action.type) {
    case types.MATRIX:
      return action.data
    default:
      return state
  }
}

export default reduser