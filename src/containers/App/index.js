import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Header from '../../conpontens/header'
import Minefields from '../../conpontens/minefields'
import Finish from '../../conpontens/finish'
import Devtools from '../../conpontens/devtools'

import { types as levelTypes } from '../../redux/modules/level'
import { types as minesTypes } from '../../redux/modules/mines'
import { types as matrixTypes } from '../../redux/modules/matrix'
import { types as gameStatusTypes, gameStatusList } from '../../redux/modules/gameStatus'

import { bestScoreRecord, subscribeScore } from '../../utils'
import { gameLevel } from '../../utils/game'
import { initMatrix, initMinefields, blockTypes, around } from '../../utils/matrix'
import uiInfo from '../../utils/uiInfo.json'
import './index.css'

let timeoutMark = null
let bestScore = bestScoreRecord ? bestScoreRecord : {}
let score = 999

const App = (props) => {
  const {level, mines, matrix, gameStatus} = props
  const {switchLevel, setNumberOfMines, setMatrix, setGameStatus} = props
  // 雷区数据/设置雷区数据
  const [minefields, setMinefields] = useState(initMinefields(gameLevel[level]))
  // 结算窗口显示状态
  const [settlementWindow, setSettlementWindow] = useState(false)
  // 测试功能：打开雷区
  const [openAllBlock, setOpenAll] = useState(false)

  useEffect(() => {
    console.log(minefields)
  }, [])

  useEffect(() => {
    if (gameStatus === gameStatusList.lose) {
      loseAnimate()
    }
  })

  useEffect(() => {
    if (gameStatus === gameStatusList.running) {
      const remainClose = getMinefielosInfo({
        result:'remainClose',
        returnPoints: false
      }).count
      const remainMines = getMinefielosInfo({
        result:'remainMines',
        returnPoints: false
      }).count
      if ((remainClose - remainMines) === 0) {
        gameVictory()
      }
      if (remainMines < gameLevel[level].mines) {
        gameOver()
      }
    }
  }, [matrix])

  const setMinefieldsMiddleware = (newState) => {
    console.log(newState)
    setMinefields(newState)
  }

  // 重置
  const reset = (newLevel) => {
    const nowLevel = (newLevel === undefined ? level : newLevel)

    setOpenAll(false)

    setGameStatus(gameStatusList.waiting)
    setNumberOfMines(gameLevel[nowLevel].mines)
    setMinefieldsMiddleware(initMinefields(gameLevel[nowLevel]))
    setMatrix(initMatrix(gameLevel[nowLevel].rows, gameLevel[nowLevel].cols))
    setSettlementWindow(false)
  }

  // 切换难度
  const changeLevel = (newLevel) => {
    if (gameStatus === gameStatusList.waiting || gameStatus === gameStatusList.running) {
      switchLevel(newLevel)
      reset(newLevel)
    }
  }

  // 游戏胜利
  const gameVictory = () => {
    const setBestScore = (newScore) => {
      if (!bestScore[level]
        || newScore < bestScore[level]
      ) {
        bestScore[level] = newScore
        subscribeScore(bestScore)
      }
    }
    setGameStatus(gameStatusList.win)
    setBestScore(score)
    setSettlementWindow(true)
  }

  // 游戏失败
  const gameOver = () => {
    setGameStatus(gameStatusList.lose)
  }

  // 设置新的状态矩阵
  const setNewMatrix = (callback) => {
    const newMatrix = matrix.map((r, y) => (
      r.map((c, x) => {
        return callback(r, c, x, y)
      })
    ))
    setMatrix(newMatrix)
  }

  // 检查数组中是否出现过相同值
  const checkArray = (arr, find) => {
    const flag = arr.findIndex(e => e[0] === find[0] && e[1] === find[1])
    return flag === -1 ? false : true
  }

  // 自动打开周围的安全块
  const autoOpenSafe = (centerPoint, openPoint) => {
    if (minefields[centerPoint.y]
      && minefields[centerPoint.y][centerPoint.x] === 0
    ) {
      around.forEach(offset => {
        const x = centerPoint.x + offset[0]
        const y = centerPoint.y + offset[1]
        if (minefields[y]
          && minefields[y][x] < 9
          && matrix[y][x] === blockTypes.close
          && !checkArray(openPoint, [x, y])
        ) {
          openPoint.push([x, y])
          autoOpenSafe({x, y}, openPoint)
        }
      })     
    }
  }

  // 获取雷区信息
  // options
  // {
  //   result: 'remainMines' | 'remainMinesNoFlag' | 'remainClose'
  //   returnPoints: true | false
  // }
  const getMinefielosInfo = (options) => {
    let count = 0
    const points = []
    let flag

    switch (options.result) {
      case 'remainMines':
        flag = (x, y, c) => (c === 9 && (matrix[y][x] === blockTypes.close || matrix[y][x] === blockTypes.flag))
        break
      case 'remainMinesNoFlag':
        flag = (x, y, c) => (c === 9 && matrix[y][x] === blockTypes.close)
        break
      case 'remainClose':
        flag = (x, y) => (matrix[y][x] === blockTypes.close || matrix[y][x] === blockTypes.flag)
        break
      default:
        throw 'getMinefielosInfo: result is not allowed value'
    }
    minefields.forEach((r, y) => (
      r.forEach((c, x) => {
        if (flag(x, y, c)) {
          ++count
          if (options.returnPoints) {
            points.push([x, y])
          }
        }
      })
    ))
    return {
      count,
      points
    }
  }

  // 失败动画
  const loseAnimate = () => {
    const showAllMines = () => {
      if (timeoutMark !== null) {
        clearTimeout(timeoutMark)
        timeoutMark = null
      }
      setNewMatrix((r, c, x, y) => {
        if (c === blockTypes.close
          && minefields[y][x] === 9
        ) {
          return blockTypes.open
        }
        return c
      })
    }
    const {count, points} = getMinefielosInfo({
      result: 'remainMinesNoFlag',
      returnPoints: true
    })
    if (count === 0 && !settlementWindow) {
      setSettlementWindow(true)
    } else if (count > 0 && settlementWindow) {
      showAllMines()
    } else if (count > 0) {
      timeoutMark = setTimeout(() => {
        const aimPoint = points[Math.floor(Math.random() * count)]
        if (aimPoint.length === 2) {
          setNewMatrix((r, c, x, y) => {
            if (x === aimPoint[0]
              && y === aimPoint[1]
              && c === blockTypes.close
              && minefields[y][x] === 9
            ) {
              return blockTypes.open
            }
            return c
          })
        }
      }, Math.floor(Math.random() * (260 - 100) + 100)) // random range [100, 260)
    }
  }

  const onScore = (newScore) => {
    score = newScore
  }

  // 重置游戏事件处理
  const restartClick = () => {
    if (gameStatus === gameStatusList.waiting || gameStatus === gameStatusList.running) {
      reset()
    }
  }

  // 旗帜计数器
  const alterFlag = {
    add: () => {
      setNumberOfMines(mines - 1)
    },
    remove: () => {
      setNumberOfMines(mines + 1)
    }
  }

  // 点击地雷块逻辑
  // btnType 鼠标按键类型 -1左击，1右击
  const clickBlock = (point, newBlockType, btnType) => {
    if (gameStatus === gameStatusList.waiting
      || gameStatus === gameStatusList.running
    ) {
      if (gameStatus === gameStatusList.waiting) {
        setGameStatus(gameStatusList.running)
      }
      if (btnType === 1) {
        if (newBlockType === blockTypes.close) {
          alterFlag.remove()
        } else if (newBlockType === blockTypes.flag) {
          alterFlag.add()
        }
      }

      let autoPoint = []
      if (newBlockType === blockTypes.open) {
        autoOpenSafe(point, autoPoint)
      }
      setNewMatrix((r, c, x, y) => {
        if ((x === point.x && y === point.y)) {
          return newBlockType
        }
        if (newBlockType === blockTypes.open && checkArray(autoPoint, [x, y])) {
          return newBlockType
        }
        return c
      })
    }
  }

  // 雷区整体点击事件
  const minefieldsHandle = () => {
    if (gameStatus === gameStatusList.win
      || gameStatus === gameStatusList.lose
    ) {
      if (!settlementWindow) {
        setSettlementWindow(true)
      }
    }
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="main">
          <Header
            level={level}
            mines={mines}
            gameStatus={gameStatus}
            onScore={onScore}
            onChangeLevel={changeLevel}
            onRestart={restartClick}
          />
          <Minefields
            matrix={matrix}
            minefieldsInfo={minefields}
            blockSize={uiInfo[level].size}
            clickBlock={clickBlock}
            minefieldsHandle={minefieldsHandle}
            openAllBlock={openAllBlock}
          />
        </div>
        <div className={classNames('finish-warp', {'show': settlementWindow})}>
          <Finish
            gameStatus={gameStatus}
            score={score}
            bestScore={bestScore[level]}
            onRestart={reset}
          />
        </div>
        
        {
          process.env.NODE_ENV === 'development' ? 
            <Devtools
              setOpenAll={setOpenAll}
              openDialogHandle={() => {setSettlementWindow(!settlementWindow)}}
            /> :
            null
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    level: state.level,
    mines: state.mines,
    matrix: state.matrix,
    gameStatus: state.gameStatus
  }
}

const mapDispathToProps = (dispath) => {
  return {
    switchLevel: (newLevel) => {
      dispath({
        type: levelTypes.GAME_LEVEL,
        data: newLevel
      })
    },
    setNumberOfMines: (data) => {
      dispath({
        type: minesTypes.MINES,
        data
      })
    },
    setMatrix: (data) => {
      dispath({
        type: matrixTypes.MATRIX,
        data
      })
    },
    setGameStatus: (data) => {
      dispath({
        type: gameStatusTypes.SET_GAME_STATUS,
        data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(App)