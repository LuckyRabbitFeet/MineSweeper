export const types = {
  SET_GAME_STATUS: 'SET_GAME_STATUS'
}

export const gameStatusList = {
  waiting: 'waiting',
  running: 'running',
  win: 'win',
  lose: 'lose'
}

export const actions = {
  setGameStatus: (data) => ({
    type: types.SET_GAME_STATUS,
    data
  }),
  // gameWaiting: () => ({
  //   type: types.GAME_WAITING
  // }),
  // gameRunning: () => ({
  //   type: types.GAME_RUNNING
  // }),
  // gameWin: () => ({
  //   type: types.GAME_WIN
  // }),
  // gameLose: () => ({
  //   type: types.GAME_LOSE
  // }),
  // gameFinish: () => ({
  //   type: type.GAME_FINISH
  // })
}

const reduser = (state = gameStatusList.waiting, action) => {
  switch (action.type) {
    case types.SET_GAME_STATUS:
      return action.data
    default:
      return state
  }
}

export default reduser