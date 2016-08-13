
# flex

## 简介

CSS flex 属性是一个简写属性，它具有定义一个可伸缩项目的能力。flex元素可以根据他们的flex-grow 因子拉伸以填充可用空间，或根据他们的 flex-shrink 因子收缩以防止溢出。

- 初始值	as each of the properties of the shorthand:
flex-grow: 0
flex-shrink: 1
flex-basis: auto
- 适用元素	flex items, including in-flow pseudo-elements
- 是否是继承属性	否
- 适用媒体	visual
- 计算值	as each of the properties of the shorthand:
flex-grow: as specified
flex-shrink: as specified
flex-basis: as specified, but with relative lengths converted into absolute lengths
- 是否适用于 CSS 动画	as each of the properties of the shorthand:
flex-grow: yes, as a number
flex-shrink: yes, as a number
flex-basis: yes, as a length, percentage or calc(); when both values are lengths, they are interpolated as lengths; when both values are percentages, they are interpolated as percentages; otherwise, both values are converted into a calc() function that is the sum of a length and a percentage (each possibly zero), and these calc() functions have each half interpolated as real numbers.
- 正规顺序	order of appearance in the formal grammar of the values

## 语法

```
/* 0 0 auto */
flex: none;

/* 单值，没有单位的数字，是flex-grow */
flex: 2;

/* 单值，有单位的，宽、高，是flex-basis */
flex: 10em;
flex: 30px;
flex: auto;
flex: content;

/* 两个值：flex-grow | flex-basis */
flex: 1 30px;

/* 两个值：flex-grow | flex-shrink */
flex: 2 2;

/* 三个值：flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;

/* 全局值 */
flex: inherit;
flex: initial;
flex: unset;

```


## Values

<'flex-grow'>
定义flex item的flex-grow属性。 详细内容请参见 <number>。 负值无效。 默认值为1。
<'flex-shrink'>
定义flex item的flex-shrink属性. 详细内容请参见 <number>。 负值无效。 默认值为1。
<'flex-basis'>
定义flex item的flex-basis属性。任何可用于width和height的值都可接受。若值为0，则必须加上单位，以免被视作伸缩性。 默认值为0%
none
该关键字等于 0 0 auto.



## 实例
```
//css
#flex-container {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: row;
	flex-direction: row;
}

#flex-container > .flex-item {
	-webkit-flex: auto;
	flex: auto;
}

#flex-container > .raw-item {
	width: 5rem;
}

//html
<div id="flex-container">
    <div class="flex-item" id="flex">Flex box (click to toggle raw box)</div>
    <div class="raw-item" id="raw">Raw box</div>
</div>
```