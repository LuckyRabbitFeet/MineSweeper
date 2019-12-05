import React, { useState, useEffect } from 'react'
import './index.css'

const SelectLevel = ({level, onChangeLevel}) => {
  const [showMenu, setShowMenu] = useState(false)

  const levelList = {
    easy: '低难度',
    normal: '中等难度',
    hard: '高难度'
  }

  const handleCheckShow = (event) => {
    event.nativeEvent.stopImmediatePropagation()
    setShowMenu(!showMenu)
    
  }

  useEffect(() => {
    const clickHandle= () => {
      if (showMenu) {
        setShowMenu(false)
      }
    }
    document.addEventListener('click', clickHandle)
    return () => {
      document.removeEventListener('click', clickHandle)
    }
  })

  return (
    <div className="select">
      <p onClick={handleCheckShow}>{levelList[level]}<span className="dorp-icon"></span></p>
      <div className="select-menu"
      style={{visibility: showMenu ? 'visible' : null}}
      onClick={handleCheckShow}>
        <ul>
          <li className={level === 'easy' ? 'selected' : null}
            onClick={() => onChangeLevel('easy')}>
            <div>低难度</div>
          </li>
          <li className={level === 'normal' ? 'selected' : null}
            onClick={() => onChangeLevel('normal')}>
            <div>中等难度</div>
          </li>
          <li className={level === 'hard' ? 'selected' : null}
            onClick={() => onChangeLevel('hard')}>
            <div>高难度</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

// class SelectLevel1 extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       showMenu: false
//     }
//   }

//   componentDidMount() {
//     document.addEventListener('click', () => {
//       console.log('click')
//       if (this.state.showMenu) {
//         console.log(this.state.showMenu)
//         this.setShowMenu()
//         console.log(this.state.showMenu)
//       }
//     })
//   }

//   setShowMenu = () => {
//     this.setState({
//       showMenu: !this.state.showMenu
//     })
//   }

//   handleCheckShow = (event) => {
//     event.nativeEvent.stopImmediatePropagation()
//     console.log('check1', this.state.showMenu)
//     this.setShowMenu()
//     console.log('check2', this.state.showMenu)
//   }

//   render() {
//     const levelList = {
//       easy: '低难度',
//       normal: '中等难度',
//       hard: '高难度'
//     }

//     const {level, switchLevel} = this.props

//     return (
//       <div className="select">
//         <p onClick={this.handleCheckShow}>{levelList[level]}<span className="dorp-icon"></span></p>
//         <div className="select-menu"
//         style={{visibility: this.state.showMenu ? 'visible' : null}}
//         onClick={this.handleCheckShow}>
//           <ul>
//             <li className={level === 'easy' ? 'selected' : null}
//               onClick={() => switchLevel('easy')}>
//               <div>低难度</div>
//             </li>
//             <li className={level === 'normal' ? 'selected' : null}
//               onClick={() => switchLevel('normal')}>
//               <div>中等难度</div>
//             </li>
//             <li className={level === 'hard' ? 'selected' : null}
//               onClick={() => switchLevel('hard')}>
//               <div>高难度</div>
//             </li>
//           </ul>
//         </div>
//       </div>
//     )
//   }
// }

export default SelectLevel