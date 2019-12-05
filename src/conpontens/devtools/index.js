import React from 'react'

const divStyle = {
  position: 'fixed',
  top: '10px',
  left: '10px',
  padding: '5px',
  border: '1px solid #000'
}

const btnStyle = {
  display: 'block',
  padding: '0 3px'
}

const Devtools = ({setOpenAll, openDialogHandle}) => {
  return (
    <div style={divStyle}>
      <button
        style={btnStyle}
        onClick={() => setOpenAll(true)}
      >
        开启全部格子
      </button>
      <button
        style={btnStyle}
        onClick={openDialogHandle}
      >
        打开结算窗口
      </button>
    </div>
  )
}

export default Devtools