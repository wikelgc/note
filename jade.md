===
jade--源于Node.js的HTMl模板引擎
---

Jade是一个高性能的模板引擎，他深受Haml影响，他是使用javascript实现的，并且可以供Node使用。

##特性
##安装

```
npm install jade
```

##浏览器执行
把jade编译成一个可供浏览器使用的单文件，只需要简单的执行

```
make jade.js
```

##标签

```
html //转化成<html></html>

div#container//转化成<div id="container"></div>

div.user-details//转化成<div class="user-details"></div>

div#foo.bar.baz//转换成<div id="foo" class="bar baz"></div>
```
