# jQuery之选择器


## 基础选择器
- ID选择器:
```
$(function(){
	$("#my_id").html();//获取id为my_id的html
})
```

- 元素选择器(Element)
```
$(function(){
	$("element")。css("font-weight","bold");
})
```

- 类选择器(class)
```
$(function(){
	$(".class").attr("class");//attr：设置放回被选元素的属性值
})
```

- 通配选择器
```
$(function(){
	$("div *").html("我们是一家人")；//获取div的所有子元素
})
```

- 群组选择器
```
$(function(){
	$("div,p").html("我们的身份很特殊")；
})
```

- ance desc选择器
```
$(function(){
	$("div span").html("我们是一个家族的子孙");
})
```

- parent>child选择器
```
$(function(){
	$("div>span").html("我们是一个家庭下的子辈们");
})
```

- prev+next选择器
```
$(function(){
	$("p+span").html(“我是p先生楼下紧邻的码友”)；//可以用nest()来代替prev+next选择器
})
```

- prev~sibling选择器
```javascript
$(function(){
	$(p~span).hmtl("我们是p先生楼下的码友")；//选取p元素后的所有span元素，可以用nextAll()选择器来代替prev~siblings选择器
})
```

## 过滤选择器

过滤选择器主要是通过特定的过滤规则来刷选出所需要的DOM元素，过滤规则与CSS中的伪类选择器语法相同，即选择器都是一个冒号(:)开头。按不同的规则过滤。

### 基本的过滤器
- :first：选取第一个元素
```javascript
$(function(){
	$(div:first).css("background","#bfa");
})
```

- :last:选取最后一个元素
```javascript
$(function(){
	$(div:last).css("background","#bfa");
})
```

- :not(select):去除所有与给定选择器匹配的元素
```javascript
$(function(){
	$(div:not(.one)).css("background","#bfa");
})
```

- :even：选取索引是偶数的所有索引，索引从0开始
```javascript
$(function(){
	$(div:evne).css("background","#bfa");
})
```

- :odd：选取索引是技术的所有索引，索引从0开始
```javascript
$(function(){
	$(div:odd).css("background","#bfa");
})
```

- :eq(index):选取索引等于index的元素
```javascript
$(function(){
	$(div:eq(3)).css("background","#bfa");
})
```

- :gt(index):选取索引大于index的元素
```javascript
$(function(){
	$(div:gt(3)).css("background","#bfa");
})
```

- :lt(index):选取索引小于index的元素
```javascript
$(function(){
	$(div:lt(2)).css("background","#bfa");
})
```

- :header:选取所有的标题元素，例如：h1,h2,h3等
```javascript
$(function(){
	$(div:header).css("background","#bfa");
})
```

- :animated:选取当前正在执行动画的所有元素
```javascript
$(function(){
	$(div:animated).css("background","#bfa");
})
```

- :focus:选取当前获取焦点的元素
```javascript
$(function(){
	$(div:focus).css("background","#bfa");
})
```

### 内容过滤选择器
内容过滤器的过滤规则主要体现在他所包含的子元素或文本内容上：
- :contains(text)  选取包含文本内容为"text"的元素
```javascript
$(function(){
	$(div:contains(di)).css("background","#bfa");
})
```

- :empty 选取不包含子元素或者文本的空元素
```javascript
$(function(){
	$(div:empty).css("background","#bfa");
})
```

- :has(selector) 选取含有选择器所匹配的元素的元素
```javascript
$(function(){
	$(div:has('.mini')).css("background","#bfa");
})
```

- :parent 选取含有子元素或者文本的元素
```javascript
$(function(){
	$(div:parent).css("background","#bfa");
})
```

### 可见性过滤选择器
可见性过滤选择器是根据元素的可见和不可见状态来选择相应的元素。

- :hidden 选取所有看不见的元素
```javascript
$(function(){
	$("div:hidden").show(3000);//3后可见
})
```

- :visible 选取所有看得见的元素
$(function(){
	$("div:visible").css("background","#F60";
})

### 属性过滤选择器
属性过滤选择器的规则是通过元素的属性来获取相应的元素

- [attribute] 选取拥有此属性的元素
```javascript
$(function(){
	$("div[title]").css("background","#F60";//含有title属性的div元素
})
```

- [attribute=value] 选取属性值为value的元素
```javascript
$(function(){
	$("div[title=value]").css("background","#F60";//含有title属性的div元素
})
```

- [attribute!=value] 选取属性值不等于value的元素
```javascript
$(function(){
	$("div[title!=test]").css("background","#F60";
})
```

- [attribute^=value] 选取属性值以value开始的元素
```javascript
$(function(){
	$("div[title^=test]").css("background","#F60";
})
```

- [attribute$=value] 选取属性值以value结束的元素
```javascript
$(function(){
	$("div[title$=test]").css("background","#F60";
})
```

- [attribute*=value] 选取属性值含有value的元素
```javascript
$(function(){
	$("div[title*=test]").css("background","#F60";
})
```

- [attribute|=value] 选取属性等于给定字符串或以该字符串为前缀的元素
```javascript
$(function(){
	$("div[title|=test]").css("background","#F60";
})
```

- [attribute~=value] 选取属性用空格分隔的值中包含一个给定值的元素
```javascript
$(function(){
	$("div[title~=test]").css("background","#F60";
})
```

- [attribute1][attribute2][attribute3] 用属性选择器合并成一个符合属性选择器，满足多个条件。
```javascript
$(function(){
	$("div[id][title*=test]").css("background","#F60";//改变含有属性id，并且属性title值含有"title"的<div>的背景色
})
```

### 子元素过滤选择器
- nth-child
- first-child
- last-child
- only-child
- nth-child
