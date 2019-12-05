import React, { useState, useEffect  } from 'react'

import clock from '../../../images/clock_icon.png'
import './index.css'

// const Clock = ({gameStatus}) => {
//   const [time, setTime] = useState(0)
//   let timeoutMark = null
//   const handleTimer = () => {
//     timeoutMark = setTimeout(() => {
//       if (time < 999){
//         setTime(time + 1)
//       }
//     }, 1000)
//   }

//   useEffect(() => {
//     if (gameStatus === 'running') {
//       handleTimer()
//     } else if (gameStatus === 'waiting') {
//       setTime(0)
//     }
//     return () => {
//       if (gameStatus !== 'running') {
//         console.log('clear timeout')
//         if (timeoutMark !== null) {
//           clearTimeout(timeoutMark)
//           timeoutMark = null
//         }
//       }
//     }
//   }, [gameStatus, time])

//   return (
//     <div className="clock">
//       <img src={clock} />
//       <span>{
//         time.toString().padStart(3, '0')
//       }</span>
//     </div>
//   )
// }

let timeoutMark = null
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.gameStatus !== 'running') {
      if (timeoutMark !== null) {
        clearTimeout(timeoutMark)
        timeoutMark = null
      }
      return false
    }
    return true
  }

  componentDidUpdate = (prevProps) => {
    console.log('update')
    if (prevProps.gameStatus !== this.props.gameStatus){
      if (this.props.gameStatus === 'running') {
        this.handleTimer()
      } else if (this.props.gameStatus === 'waiting') {
        this.setTime(0)
      }
    }
  }

  setTime = (newTime) => {
    this.setState({
      time: newTime
    })
  }

  handleTimer = () => {
    timeoutMark = setTimeout(() => {
      if (this.state.time < 999){
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