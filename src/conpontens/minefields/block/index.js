import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

import { blockTypes } from '../../../utils/matrix.js'

import './index.css'

const colorList = [
  '#1976D2',
  '#388E3C',
  '#D32F2F',
  '#7B1FA2',
  '#FF8F00',
  '#48E6F1',
  '#ED44B5',
  '#F4C20d'
]

class Block extends React.Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate = (nextProps) => {
    if (this.props.blockStatus === nextProps.blockStatus
      && this.props.size === nextProps.size
      && this.props.children === nextProps.children
    ) {
      return false
    }
    return true
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  leftHandle = () => {
    this.props.clickBlock(blockTypes.open)
  }

  rightHandle = (e) => {
    e.preventDefault()
    if (this.props.blockStatus === blockTypes.close) {
      this.props.clickBlock(blockTypes.flag, 1)
    } else if (this.props.blockStatus === blockTypes.flag) {
      this.props.clickBlock(blockTypes.close, 1)
    }
  }

  render = () => {
    const { color, size, blockStatus, children } = this.props

    const blockClassList = {
      'close-0': color && (blockStatus === blockTypes.close || blockStatus === blockTypes.flag),
      'close-1': !color && (blockStatus === blockTypes.close || blockStatus === blockTypes.flag),
      'open-0': color && blockStatus === blockTypes.open,
      'open-1': !color && blockStatus === blockTypes.open,
      'flag': blockStatus === blockTypes.flag,
      'boom': blockStatus === blockTypes.open && children === 9,
      //'is-boom': children === 9
    }
    if (children > 0 && children < 9) {
      blockClassList['mine-' + children] = (blockStatus === blockTypes.open)
    }
    
    const blockClass = classNames(
      'block',
      blockClassList
    )

    const style = {
      width: `calc(${size} - 6px)`,
      height: `calc(${size} - 6px)`,
      fontSize: `calc(${size} - 6px)`,
      lineHeight: `calc(${size} - 6px)`
    }
    if (blockStatus === blockTypes.open && children === 9) {
      const boomColor = this.getRandomInt(8)
      style.background = colorList[boomColor]
      style.borderColor = colorList[boomColor]
    }

    return (
      <span
        className={blockClass}
        style={style}
        onClick={blockStatus === blockTypes.close ? this.leftHandle : null}
        onContextMenu={this.rightHandle}
      >
        {
          (children > 0 && children < 9 && blockStatus === blockTypes.open) ? children : ''
        }
      </span>
    )
  }
}

export default Block