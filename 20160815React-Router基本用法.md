# React-Router基本用法

> React-Router是官方维护的唯一可选的react路由库。他通过管理URL,实现组件的切换和状态的变化，开发复杂的应用几乎肯定会用到。

## 基本用法
React Router安装命令如下

```javascript
npm install -s react-router
```

使用时，路由器Router就是React的一个组件

```javascript
import {Router} from 'react-router';
render(<Router/>,document.getElementById('app'));

```