===
ionic入门笔记（2）
----

##色彩，图形，边距
###色彩
ioinc定义了9钟前景/背景/边框的色彩样式
```javascript
//边框：
.light-border
.stable-border
.positive-border
.calm-border
.balanced-border
.energized-border
.assertive-border
.royal-border
.dark-border
//前景
.light
.bar-stable
.position
.calm
.balanced
.energized
.assertive
.royal
.dark
//背景
.light-bg
.statle-bg
.positive-bg
.calm-bg
.balanced-bg
.energized-bg
.assertive-bg
.royal-bg
.dark-bg
```

可以在任何元素上使用这些样式设置前景和背景颜色
```html
<any class="positive-bg energized">
...
</any>
```

###test:
```html
<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width,height=device-height">
	<link rel="stylesheet" type="text/css" href="ionic.min.css">
</head>
<body>
	<div class="bar bar-header bar-positive">
		<h1 class="title">Colors</h1>
	</div>
  	<div class="bar bar-subheader calm-bg">
      <h3 class =" title">hehe</h3>
    </div>
	<div class="scroll-content has-header">
		<div class="balanced-bg light">bg:balanced fg:light</div>
		<div class="energized-bg balanced">bg:energized fg:balanced</div>
		<div class="dark-bg stable">bg:dark fg:stable</div>
		<div class="assertive-bg royal">bg:assertive fg:royal</div>
	</div>
</body>
</html>
```

###图标
ioinc使用ionicons图库样式库，ionicons采用了TrueType字体实现图标样式，有超过500个图标可供选择。
使用图标很简单，在元素上声明一下两个css类即可：
- .icon-将元素声明为图标
- .icon-{icon-name}-声明要使用的具体图标

通常使用`i`元素定义图标
```
<i class="icon ion-ionic calm"></i>
```

###内边距
ionic定义了常用的内边距样式：
```
.padding-bottom
.padding
.padding-right
.padding-top
.padding-left
```

边距统一为10px;可以在任何元素中使用这些样式

##页面组件-列表
链表非常适合在手机屏幕上显示信息。使用.list定义列表内容，使用.item定义列表成员
```javascript
<any class = "list">
    <any class="item">...</any>
    <any class="item">...</any>
    <any class="item">...</any>
    <any class="item">...</any>
    <any class="item">...</any>  
</any>
 ```
 
###成员容器
 列表的样式定制主要发生在.item元素上。在.item元素内，可以通过插入文本，徽章，图标，图像，按钮等各种样式的元素：
 
 | 1 |2  |3  |4|
|--------|--------|-------| ---- |
| |同级样式|边框|.item-borderless|
|||配色|.item-{color}|
|||分组|.item-divider|
|||按钮位置|.item-button-left|
|||图标位置|.item-button-right|
|||头像位置|.item-icon-left|
|||缩略图位置||
|||图像位置||
|.item|||
|     |下级样式|文本||
|||徽章||
|||图标||
|||图像||
|||按钮||


-----
- 嵌入文本
> 列表成员中经常要显示不同规格的文本，不如今日头条的新闻列表：
.item元素可以使用h1~h6/p标签插入到不同规格的文本。


- item:嵌入图标
> 列表成员的内容中插入图标：
> 1. 在.item元素是上声明图标位置。图标可以位于列表的左侧或者右侧，分别使用.item-icon-left和.item-icon-right声明
> 2. 在.item元素内插入图标

- item:嵌入头像
>在ionic中，头像被设置为40*40固定大小。和插入图标类似，向.item中插入头像满足两个条件：
>1. 在.item元素上声明头像的位置。头像可以位于列表的左侧或者右侧，分别使用.item-avatar-left和.item-avatar-right声明
>2. 在.item元素内使用img标签插入头像

- item：嵌入缩略图
>在ionic中，缩略图被定义为80px,比头像撒，适合新闻图片。和插入头像相似，向.item中插入缩略图需要满足两个条件：
>1. 在.item元素上声明缩略图位置。
>2. 在.item元素上使用img标签插入头像

- item: 嵌入大图


