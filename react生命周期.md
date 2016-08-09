---
React组件的生命周期
---
>React的组件拥有简洁的生命周期API，

## 实例化

>当首次使用一个组件类时，下面的方法会依次被调用
>

- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount

>对该组件内有后续调用，则依次是

- getInitialState
- componentWillMount
- render
- componentDidMount

## 存在期
>随着应用状态的依次变化，以及组建逐渐受到影响，下面的方法会一次调用

- componentWillReceiveRrops
- shouldComponentUpdate
- componeWillUpdate
- render
- conponentDidUpdate

## 销毁/清理期
最后当组建调用完成，conponentDidUpdate方法将会被调用，目的是为了给这个实例提供清理自身的机会。


## 总结
React生命周期方法会提供精心设计的钩子函数，会伴随组件的整个生命周期。和状态机类似，每个组件都被设计成了能够在整个生命周期中输出稳定，语义化的标签。

组件不会独立存在，随着父组件将props推送给他们的子组件，以及那些子组件渲染它们自身的子组件。