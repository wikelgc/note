##redux简介
1. Redux 是一个状态容器
Redux 就像是作者自己的介绍，它不会为你提供任何的东西，它不会告诉你如何做路由，它只专注于应用程序状态，是一个 JavasSript 的状态容器，所有的状态的变化都是当前状态和 Action 共同的作用结果。 对于view来说，不用关心数据是怎样变化，只需要在 view 层面等待 store 通知自己数据发生变化，然后把数据渲染成页面即可。

2. Redux 和 React 之间没有关系
Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。 尽管如此，Redux 还是和 React 和 Deku 这类框架搭配起来用最好，因为这类框架允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。

3. Redux三大原则
	- 单一数据源
	- state是只读
	- 使用纯函数来执行