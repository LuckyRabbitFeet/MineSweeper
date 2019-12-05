const StorageKey = 'REACT_MineSweeper'

// 从 localStorage 获取最好成绩记录
export const bestScoreRecord = (() => {
  let data = localStorage.getItem(StorageKey)
  if (!data) {
    return false
  }
  try {
    data = JSON.parse(data)
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e)
    }
    return false
  }
  return data
})()

// 将最好成绩记录到 localStorage
export const subscribeScore = (data) => {
  data = JSON.stringify(data);
  localStorage.setItem(StorageKey, data)
}