# CSS3的字体单位px,em,rem

## px的特点

1. IE低版本无法调整那些使用px作为单位的字体大小；

2. 国外的大部分网站能够调整的原因在于其使用了em或rem作为字体单位；

3. Firefox等现代浏览器可以能够调整px和em，rem的大小。

## em的特点

1. em的值并不是固定的；

2. em会继承父级元素的字体大小。

注意:
所以我们在使用em写CSS的时候，需要注意两点：

1. body选择器中声明Font-size=62.5%,方面计算使用em是的大小；

2. 将你的原来的px数值除以10，然后换上em作为单位；

3. 重新计算那些被放大的字体的em数值,避免字体大小的重复声明。

## rem的特点

rem是CSS3新增的一个相对单位（root em,根em。

这个单位与em有什么区别:

1. 区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。

2. 通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。

3. 除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。


## 使用rem的优点

在移动端可以做到适配不同的手机分辨率，并保持整体的缩放。除非用响应手机,平板,PC等不同布局，否则可以不需要使用'media qurey'。

如果设计师是按照iPhone6的宽度来时设计，即375px,那么完全可以使用视觉稿上的尺寸来赋值给元素。

例如：
```html
html{
	font-size:calc(100vw/3.75); //如此可以使1rem的大小在iphone中等于100px;
}
```

在替换单位时，只需要把所有的px单位替换成rem，即除以100即可。

当在其他手机浏览器时，会按照iphone6的视觉稿整体缩放。


## 适配不同屏幕的小技巧

用在适配不同尺寸屏幕时，css中使用rem作为单位，代码就只需要写一遍。在适配部分只需要如下：

```css
@media only screen { html { font-size: 30px; } }
@media only screen and (max-width: 479px) and (min-width: 321px) { html { font-size: 15px; } }
@media only screen and (max-width: 320px) { html { font-size: 13px; } }

```

## chrome禁用12px的字体

chrome会默认最小字体的为12px,rem通常默认浏览器的字体大小为16px

```css
font-size: 62.5%; //1rem = 10px
```

但由于chrome的限制,会使1rem=12px;所以为了改变这种情况,可以把font-size的大小乘以2或者默认20px;

```css
font-size: 125%; 
/* 1rem = 20px */

font-size: 625%;
/* 1rem = 100px */	
```















