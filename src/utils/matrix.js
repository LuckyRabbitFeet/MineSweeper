export const blockTypes = {
  close: 0,
  open: 1,
  flag: 2,
  mistake: 3
}

const initLine = (col) => {
  const line = []
  for (let i = 0; i < col; ++i) {
    line.push(blockTypes.close)
  }
  return line
}

// 初始化矩阵
export const initMatrix = (row, col) => {
  const matrix = []
  for (let i = 0; i < row; ++i) {
    matrix.push(initLine(col))
  }
  return matrix
}

// Fisher–Yates shuffle 算法
const mineShuffle = (array, mine = array.length) => {
  let count = mine
  let index
  while (count) {
    index = Math.floor(Math.random() * count--)
    ;[array[count], array[index]] = [array[index], array[count]]
  }
  return array
}

// 分裂数组
function arrTrans(num, arr) {
  const newArr = []
  while(arr.length > 0) {
    newArr.push(arr.splice(0, num))
  }
  return newArr
}

export const around = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

// 填充环境数据
const fillEnvNum = (dataList) => {
  dataList.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 9) {
        around.forEach(offset => {
          const row = rowIndex + offset[0]
          const col = colIndex + offset[1]
          if (
            dataList[row] &&
            dataList[row][col] !== undefined &&
            dataList[row][col] !== 9
          ){
            ++dataList[row][col]
          }
        })
      }
    })
  })
}

// 初始化雷区
export const initMinefields = (options) => {
  const {rows, cols, mines} = options
  const safeArea = (new Array(rows * cols - mines)).fill(0)
  const mineArea = (new Array(mines)).fill(9)
  let totalArea = safeArea.concat(mineArea)
  totalArea = mineShuffle(totalArea)
  let dataList = arrTrans(cols, totalArea)
  fillEnvNum(dataList)
  return dataList
}