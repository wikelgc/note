===
jQuery之选择器
---

##基础选择器
- id选择器:
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

- *选择器
```
$(function(){
	$("div *").html("我们是一家人")；//获取div的所有子元素
})
```

- 选取多个选择器
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
	$("p+span").html(“我是p先生楼下紧邻的码友”)；
})
```

- prev~sibling选择器
```
$(function(){
	$(p~span).hmtl("我们是p先生楼下的码友")；//选取p元素后的所有span元素
})
```

##过滤性选择器
