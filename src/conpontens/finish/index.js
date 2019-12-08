import React from 'react'
import classNames from 'classnames'

import Reset from '../reset'
import { gameStatusList } from '../../redux/modules/gameStatus'

import clockIcon from '../../images/clock_icon.png'
import trophyIcon from '../../images/trophy_icon.png'

import './index.css'

let prevGameStatus = null
const Finish = ({gameStatus, score, bestScore, onRestart}) => {
  if (gameStatus !== gameStatusList.win
    && gameStatus !== gameStatusList.lose
  ) {
    gameStatus = prevGameStatus
  } else {
    prevGameStatus = gameStatus
  }
  console.log(gameStatus)
  const classObj = classNames('finish-score', {
    'win': gameStatus === gameStatusList.win,
    'lose': gameStatus === gameStatusList.lose,
  })
  return (
    <div className="finish">
      <div className={classObj}>
        <div className="finish-time">
          <img src={clockIcon} />
          <span>{gameStatus === 'win' ? score.toString().padStart(3, '0') : '–––'}</span>
        </div>
        <div className="best-score">
          <img src={trophyIcon} />
          <span>{bestScore ? bestScore.toString().padStart(3, '0') : '–––'}</span>
        </div>
      </div>
      <div className="finish-btn">
        <Reset onReset={onRestart}>
          {gameStatus === 'win' ? '再玩一次吧' : '再试一次吧'}
        </Reset>
      </div>
    </div>
  )
}

export default Finish