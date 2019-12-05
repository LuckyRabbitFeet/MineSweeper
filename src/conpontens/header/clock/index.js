import React from 'react'

import clock from '../../../images/clock_icon.png'
import './index.css'

let timeoutMark = null
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.gameStatus !== 'running') {
      if (timeoutMark !== null) {
        clearTimeout(timeoutMark)
        timeoutMark = null
      }
    }
    if (nextProps.gameStatus === this.props.gameStatus
      && nextState.time === this.state.time
    ) {
      return false
    }
    return true
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.gameStatus !== this.props.gameStatus) {
      if (this.props.gameStatus === 'running') {
        this.handleTimer()
      } else if (this.props.gameStatus === 'waiting') {
        this.setTime(0)
      }
    }
  }

  setTime = (newTime) => {
    this.props.onScore(newTime)
    this.setState({
      time: newTime
    })
  }

  handleTimer = () => {
    timeoutMark = setTimeout(() => {
      if (this.state.time < 999) {
        this.setTime(this.state.time + 1)
      }
      this.handleTimer()
    }, 1000)
  }

  render = () => (
    <div className="clock">
      <img src={clock} />
      <span>{
        this.state.time.toString().padStart(3, '0')
      }</span>
    </div>
  )
}

export default Clock