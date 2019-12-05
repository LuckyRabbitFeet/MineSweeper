import React from 'react'
import Block from './block'

import { blockTypes } from '../../utils/matrix'

let Minefields = ({blockSize, matrix, minefieldsInfo, clickBlock, minefieldsHandle, openAllBlock}) => {
  return (
    <div className="minefields" onClick={minefieldsHandle}>
      {
        matrix.map((p, k1) => (
          <p key={k1}
            style={{height: blockSize}}
          >
            {
              p.map((e, k2) => (
                <Block key={k2}
                  color={k1 % 2 === 0 ? (k2 % 2 === 0) : !(k2 % 2 === 0)}
                  size={blockSize}
                  blockStatus={openAllBlock ? blockTypes.open : e}
                  clickBlock={(newBlockType, btnType) => clickBlock({x: k2, y: k1}, newBlockType, btnType)}
                >
                  {minefieldsInfo[k1][k2]}
                </Block>
              ))
            }
          </p>
        ))
      }
    </div>
  )
}

export default Minefields