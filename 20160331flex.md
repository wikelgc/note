
# css3 box-flex


## 简介
flex是个非常好用的属性，如果说有什么可以完全代替 float 和 position ，那么肯定是非它莫属了（虽然现在还有很多不支持 flex 的浏览器）。然而在移动开发中，本来绝大多数浏览器（包括安卓2.3以上的自带浏览器）都支持的属性，偏偏有个例外，就是国产某某X5内核神器（不知哪个版本的webkit，仅支持 display:box），自主研发这东西也不好多说什么了，下面入正题。


## 兼容性
除了 Safari，其他所有主流浏览器都支持 flex 属性。
IE 9 及其之前的版本不支持 flex 属性。IE 10 需要前缀 -ms- 才支持该属性。

## 定义和用法
flex 属性相对于同一容器其他灵活的项目，规定项目的长度。
flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的速记属性。
注意：如果元素不是灵活的项目，则 flex 属性不起作用。

| 默认值 | 0 1 auto|
|--------|--------|
|   继承  | 否     |
|可动画化|是，参见个别属性|
|版本|CSS3|
|javascript语法|object.style.flex="1"|

## css语法
```
flex: flex-grow flex-shrink flex-basis|auto|initial|inherit;
```

## 属性值
| 值 | 描述 |
|--------|--------|
|  flex-grow|    一个数字，规定项目将相对于其他灵活的项目进行扩展的量。    |
|flex-shrink|一个数字，规定项目将相对于其他灵活的项目进行收缩的量。|
|flex-basis|	项目的长度。合法值："auto"、"inherit" 或一个后跟 "%"、"px"、"em" 或任何其他长度单位的数字|
|auto|与 1 1 auto 相同|
|none|与 0 0 auto 相同。|
|initial|设置该属性为它的默认值，即为 0 1 auto。请参阅 initial|
|inherit|从父元素继承该属性。请参阅 inherit|

