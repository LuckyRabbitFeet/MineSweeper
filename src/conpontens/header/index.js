import React from 'react'

import SelectLevel from './selectLevel'
import RemainingFlag from './remainingFlag'
import Clock from './clock'
import Reset from '../reset'

import './index.css'

let Header = ({level, mines, gameStatus, onScore, onChangeLevel, onRestart}) => {
  return (
    <header>
      <div className="header-wrapper">
        <div className="meun-bar">
          <div>
            <SelectLevel level={level} onChangeLevel={onChangeLevel} />
          </div>
          <div>
            <div className="flag-wrapper">
              <RemainingFlag mines={mines} />
            </div>
            <div className="clock-wrapper">
              <Clock
                gameStatus={gameStatus}
                onScore={onScore}
              />
            </div>
          </div>
          <div>
            <div className="features-wrapper">
              <Reset onReset={onRestart} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header