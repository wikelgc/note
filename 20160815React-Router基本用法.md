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

Router组件本身只是一个容器，真正的容器要通过Route组件定义。

```javascript
import { Router ,Route, hashHistory} from 'react-router'

render((
	<Router history = {hashHistory}>
		<route path = "/" component = {App} />
	</Router>
),document.getElementById('app'));
```

上面代码中，用户访问根路由/(比如http://www.example.com/),组件App就会加载到document.getElementById('app').

Router 组件中有一个参数history，它的值hashHistory表示:路由切换有UEL的hash变化决定。即URL的#部分发生变化。

Route组件定义了URL路径与组件的对应关系，并可以同时使用多个Route组件。

```javascript
<Router history = {hashHistory}>
	<Route path = "/" component = {App}/>
	<Route path = "/repos" component = {Repos}/>
	<Route path = "/about" component = {About}/>
</Router>
```

上面的代码中，用户访问/repos时,会加载Repos组件，访问/about时，会加载/about组件。


## 嵌套路由

Route组件还可以嵌套
```javascript
	<Router history = "hashHistory">
		<Route path = "/" component = {App}>
			<Route path = "/" component = {Repos} />
			<Route paht = "/" component = {About} />
		</Route>
	</Router>
```
上面的代码中，用户在访问/repos时，会先加载App组件，然后再他们内容再加载Reopos组件。

但App组件要写的如下的样子

```javascript
export default React.createClsss({
	render(){
	return <div>{this.props.children}</div>
}
})
```

上面的代码中，App组件的this.props.children属性就是子组件。
子路由也可以不写在Router组件里面，单独闯入Router组件的routes。

```javascript
let routes = (
		<Route path = "/" component = {App}>
			<Route path = "/repos" component = {Repos}/>
			<Route path = "/about" component = {About}/>
		</Route>
)

<Router routes = {routes} history={browerHistory}/>
```


# path属性

Route组建的path属性指定路由的匹配规则。这个属性是可以省略的。

```javascript
	<Route path = "inbox" component = {Inbox}>
		<Route path = "messages/:id" component={Message}/>
	</Route>
```

在上面的代码中，当用户访问/inbox/message/:id时，会加载下面的组件。
```javascript
	<Inbox><Message/></Inbox>

```

如何省略外层Route的path参数，写成下面的样子。
```javascript
<Route component = {Inbox}>
	<Route path = "inbox/message/:id" component={Message} />
</Route>
```
现在访问/inbox/message/:id时，组件加载还是原来的样子。

## 通配符
path属性可以使用通配符

```javascript
<Route path = "/hello/:name">
// 匹配 /hello/michael
// 匹配 /hello/ryan

<Route path = "./hello(/:name)">
// 匹配 /hello
// 匹配 /hello/mechael

<Route path = "/files/*.*">
//匹配 /files/hello.jpg
//匹配 /files/hello.html

<Route path ="/**/*.jpg">
//匹配 /files/hello.jpg
//匹配 /filse/path/to/file.jpg

```

path 属性也可以使用相对路劲。匹时就会相对于父组件的路径,可以参考


## IndexRoute组件
在上面的代码中，访问根路径`/`，不会加载任何子组件，APP组件的this.page.children,这时是undefined。

因此通常采用{this.props.children||<Home/>}这样的写法。只是，Home明明是Acounts和Statement的同级组件，却没有在toute中。

IndexRoute就是解决这个问题，显示指定home是根路由的子组件，即指定默认情况下加载的子组件。可以把IndexRoute想像成某个路径的index.html.
```javascript
<Router>
	<Route path= "/" component = {App}>
		<IndexRoute component = {Home} />
		<Route path = "accouts" component = {Accounts} />
		<Route path = "statements" component = {Statements} />
	</Route>
</Router>
```

但用户访问`/`的时候，加载的组件结构如下：
```
	<App>
		<Home />
	</App>
```

## Redirect组件

`Redirect`组件用于路由的跳转，即用户访问一个路由，会自动跳转到另一个路由。

```javascript
<Route path = "inbox" component = {Inbox}>
	<Redirect from = "message/:id" to = "/messages/:id">
</Route>
```

## IndexRedirect组件
`IndexRedirect`组件用于访问根路由的时候，将用户重定向到某个子组件。

```javascript
	<Route path = "/" component = {App}>
		<IndexRedirect to = "/welcome" />
		<Route path = "welcome" component = {welcome}>
		<Route path = "about" component = {About}>
	</Route>

```
上面的代码中，用户访问路径，将自动重定向到子组件welcome。

## LInk组件

`Link`组件用于取代<a>元素，生成一个链接，允许用户点击后跳转到另一个路由。
他基本上就是<a>React版，并可以接受Router的状态。

```javascript
render(){
	return (
		<div>
			<ul role = "nav">
				<li><Link to = "/about">About</li>
				<li><Link to = "/repos">Repos</li>
			</ul>
		</div>
	)
}
```
如果希望当前的路由域其他的路由有不同的样式，可以使用Link组件的activeStyl属性。

```
	<Link to = "/about" activeStyle = {{color:'red'}}>About</Link>
```
上面的代码中，当前页面的链接的class会包含active。


## IndexLink组件
如果链接到根路由，则不需要使用Link组件，而要使用IndexLInk组件。

```
	<IndexLink to = "/" activeClassName = "active">Home</IndexLink>
```

另一种方法是使用Link组件的onlyActiveOnIndex属性，也能达到同样的效果。

## histroy属性

Router 组件的history属性，用来监听浏览器的地址栏变化，并将URL解析成一个地址对象，共React Router匹配。


history属性一共有三种：
```
browserHistory
hashHistory
createMemotyHistoty

```
如果设置为hashHistory，路由将同URL的hash部分(#)切换，URL的形式example.com/#some#path.

```javascript
import {hashHistory} from 'react-router'

render(
	<Router history = {hashHistory} routes = {routes} />,
	document.getElementById('app');
)
```

如果设置为browerHistory，浏览器的路由就不再通过Hash完成了，而显示正常的路径example.com/some/path,实际调用的是浏览器的History API.

```javascript
import {browserHistory} from 'react-router'

render(
	<Router histoty = {browserHistory} routes = {routes} />
	document.getELementById('app');
)

## 表单处理
Link组件用于正常用户点击跳转，但有表单时还需要跳转，点击跳转等操作

```html
	<from>
		<input type = "text" placeholder="userName" />
		<input type = "text" placeholder="repo" />
		<button type ="submit">Go</button>
	</from>
```

第一种方法使用browserHistory.push

```javascript
import {browserHistory} from 'react-router'

handleSubmit(event){
	event.preventDefault()
	const userName = event.target.elements[0].value;
	const repo = event.target.elements[1].value;
	const path = '/repos/$(userName)/$(repo)';
	browserHistory.push(path);
}
```

第二种方法是使用context对象

```javascript
export default React.createClass({
	contextTypes:{
	router：React.ProTypes.object
},
	handleSubmit(event){
	this.context.router.push(path);
}

## 路由的钩子

每个路由都有Enter和Leave钩子，用户进入或离开该路由是触发。
})
```