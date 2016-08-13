# ionic入门笔记（1）


##Hybird和Other
- 开发手机App，目前有三种方式
	- 原生/Native：使用原生sdk开发App。是最理想的开发方式，缺点是对不同的平台要分别开发，高成本，周期长。
	- 原生脚本/NativeScript：将原生的API封装成javascript接口，这有点像前端的nodejs。NativeScript与原生性能损失不大，优点是开发语言统一使用javascript，缺点是针对不同平台要分别分发。
	- 混合/Hybrid：使用web技术开发App，使用CORdova/PhoneGap之类进行打包封装。优点是采用标准的web技术开发，避免不同平台原生开发体系的学习，上手快，效率高。缺点：性能上有一定的缺失。


- ionic属于hybrid开发模式，本质上是将移动web应用与浏览器打包，优点和缺点很明显。


----

ionic是一个强大的混合式/hybrid_HTML移动开发框架，特点是使用标准的HTML，CSS和javascript，开发跨平台（目前支持:Android,ios等）的原生App应用。

ionic主要包括三个部分：
- css框架-提供原生APP质感的css样式。
- javascript框架-提供原生的Web应用程序开发框架。
- 命令行/CLI- 命令行工具集用来简化应用的开发，构造和仿真运行。

##CSS框架
ionic的css框架主要提供预定义的css类，来帮助我们快速构建适用于手机端的UI。ionic的预定义css类主要分为四个方面：
- 基本布局类：ionic将手机页面的布局基本抽象为三块：头，内容，尾。基本布局类提供了这个区域的css类
- 颜色和图标类：ionic定义了几个配色方案css类，并使用ionicons提供的字体图标类。
- 界面组件类：ionic定义了丰富的界面组件css类，让HTML元素看起来像移动平台的ui组建。
- 栅格系统类：和bootstrap一样，ionic也提供了栅格系统。不过ionic的实现是基于CSS3的fiexBox模型，更为灵活。

##布局模型
手机App开发实践中，用户界面通常划分为几个区域-标题/header，内容/content和页脚/footer。微信采用的就是典型的三段布局。
标题区总是位于屏幕顶部，页脚区总是位于屏幕底部，而内容区域占据剩余的空间。ionic使用以下css类声明区域性质：
- .bar.bar-header:声明元素为标题区
- .bar.bar-footer:声明元素为页脚区
- .content:声明元素为内容区

###定高条块:.bar
样式.bar将元素声明为屏幕上绝对定位的块状区域，具有固定的高度(44px):
```
<any class="bar">...</any>
```
一旦元素应用了.bar样式，就可以继续选用两类预定义样式来进一步声明元素及其内容的外观：
1. 同级样式-同级样式与./bar应用在同意元素上，声明元素的位置，配色等。
2. 下级样式-下级样式只能应用在.bar的子元素，声明子元素的大小特征。

###.bar:位置
ionic使用以上样式定义条块的位置:
- .bar-header:置顶
- .bar-subheader:header之下置顶
- .bar-fonter:置顶
- .bar-subfooer:footer之上置顶

###./bar:嵌入子元素
在ionic中，有三种.bar子元素的样式是预定义的:
- 标题文字-对包含标题文字的元素应用.title样式，通常使用h1元素
```javascript
<any class="bar">
	<any class="title">...</any>
</any>
```
- 按钮-对用作按钮的元素，应用.button样式，通常使用button或a元素作为按钮。
```javascript
<any class = "bar">
	<any class = "button">...</any>
</any>
```
- 工具栏-工具栏包含一组按钮。对用作工具栏的元素，应用.button-bar样式，通常 使用div元素作为工具栏:
```javascript
<any class = "bar">
	<any class = "button-bar">...</any>
</any>
```


###./bar:嵌入input
一种常见的UI模式是在标题栏中嵌入搜索栏，比如大众点评:
在./bar元素中嵌入input元素，需要注意两点：
- 在条状元素上应用。item-input-inset样式
- 将input包裹在应用.item-input-wrapper样式的元素内
这是因为，在ionic的实现中，.bar中的.input样式定义如下
```javascript
.bar.item-input-inset{
	.item-input-wrapper{
    	.input{
           ...
        }
    }
}

```

###.content和.scroll-content
ionic预定义两个内容容器样式：
- .content:流式定位，内容元素在文档流中按顺序定位
- .scroll-content:绝对定位，内容元素占满整个屏幕