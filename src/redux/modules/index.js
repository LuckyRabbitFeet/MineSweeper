import { combineReducers } from "redux"

import level from './level'
import timer from './timer'
import mines from './mines'
import matrix from './matrix'
import reset from './reset'
import gameStatus from './gameStatus'
import bestScore from './score'

export default combineReducers({
  level,
  timer,
  mines,
  matrix,
  gameStatus,
  bestScore
})