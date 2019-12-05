import React from 'react'
import flagIcon from '../../../images/flag_icon.png'
import './index.css'

let RemainingFlag = ({mines}) => {
  return (
    <div className="remaining-flag">
      <img src={flagIcon} /><span>{mines}</span>
    </div>
  )
}

export default RemainingFlag