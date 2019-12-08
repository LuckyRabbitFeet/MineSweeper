# MineSweeper
用React、Redux实现的扫雷游戏。

扫雷作为windows附带的经典游戏之一是许多人热衷实现的经典游戏，在网上可以看到许许多多的分析文章，使用的语言也是各种各样，用React制作一个扫雷则是我的一个目标。

戳→ https://luckyrabbitfeet.github.io/MineSweeper/

## 效果预览
![minesweeper][1]

## 游戏玩法
* 游戏支持三种难度系数 10/40/99 颗雷。
* 通过鼠标左击打开地图，右击对地图块插旗。

## 开发中的经验梳理
* 为部分 component 编写了shouldComponentUpdate，减轻渲染压力。
* hooks 组件可以简化组件逻辑，但是后期发现 hooks 无法控制中断渲染，由于上条因素而将部分组件改写为 class组件。
* 在 hooks组件中 useEffect 通常会在每次渲染后执行，同时清除上一个 effect 的数据。
* 在渲染前需要用到的数据不能放在 useEffect 中进行计算。
* 在 useEffect 中绑定按钮事件后，需要返回清除函数进行卸载。
* 使用 postcss 插件，配合 autoprefixer 在打包时自动生成浏览器引擎前缀。

## 总结
* 作为一个 React 的练手应用，在实现过程中发现还是有很多细节可以做优化，逻辑间的组合，组件的重用，多浏览器兼容等等，都值得深入思考和专研。
* React Hooks 降低了代码复杂度，使组件更容易被重用，许多新特性也非常有意思，值得学习和尝试。
* 优化的方向既有 React 也有 Redux，并不是所有状态都需要存储在Redux中，有些状态存放为组件 state 由组件自行管理反而更有利于渲染。

## 开发
### 安装
```
npm install
```

### 运行
```
npm start
```

### 打包
```
npm run build
```

[1]: ./readme/minesweeper.gif