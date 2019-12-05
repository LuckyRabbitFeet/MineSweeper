import React from 'react'

import './index.css'

const Reset = ({onReset, children}) => {
  const resetHandle = () => {
    onReset()
  }
  return (
    <div className="reset"
      onClick={resetHandle}
    >
      <span className="reset-icon"></span>
      {children}
    </div>
  )
}

export default Reset