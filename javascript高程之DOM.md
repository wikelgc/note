javascript高程之DOM

##节点层次

###node类型
###Document类型
###Element类型
###Text类型
###Comment类型
###CDATASection类型
###DocumentType类型
###DocumentFragment类型
###Attr类型


##DOM操作技术

###动态脚本
使用`<script>`元素可以向页面中插入javascript代码，一种是通过其src特性包含外部文件，另一种方式就是使用这个元素本身来包含代码。

本章讨论的动态脚本是指页面加载时不存在，但将来的某一刻通过修改DOM动态添加脚本。跟操作HTML元素一样，创建动态的脚本也有两种方式：插入外部文件和直接插入修改javascript代码。

动态加载的外部javascript文件能够立即执行，比如下面的`<script>`:
```javascript
<script type="text/javascript" src="client.js"></script>
```

创建这个DOM代码如下：
```javascript
var script=document.createElement("script");
script.type="text/javascript";
script.src="client.js";
scirpt.body.appendChild(script);
```

另一种是指javascript代码的方式是行内方式：
```javascript
<script type="text/javascript">
	function sayHi(){
    	alert("hi");
    }
</script>
```
动态脚本如下：
```javascript
function loadScriptString(code){
	var script=docment.createElement("script");
    script.type="text/javascript";
    try{
    	script.appenChild(document.createTextNode(code));
    }catch(ex){
    	script.text=code;
    }
    document.body.appendChild(script);
}

//调用该函数
loadScriptString("funciton sayHi(){alert('hi');}");
```

以这种方式加载的代码会在全局作用域中执行，而且脚本执行 