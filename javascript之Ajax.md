===
javascript之Ajax
---

Ajax全称"Asynchronous JavaScript and XML"(异步的javascript和XML)，它并不是一种单一的技术，而是有机地利用了一系列的交互式网页应用相关技术所形成的结合体。

##Ajax的优点和不足
- Ajax的优点
 - 不需要插件支持
 - 优秀的用户体验
 - 提高Web程序的性能
 - 减轻服务器和带宽的压力
- Ajax的缺点
 - 浏览器对XMLHttpRequest对象的支持度不够
 - 破环浏览器的前进，后退按钮的正常功能
 - 对搜索引擎不友好
 - 开发和调试工具的缺乏

##Ajax的XMLHttpRequest
Ajax的核心是XMLHttpRequest对象，他是Ajax实现的关键:发送异步请求，接收响应及执行回调都是通过它来完成的。

###用javascript编写一个Ajax实例

```
<!--index.html-->
<input type="button" value="Ajax提交" onclick="Ajax():">
<div id = "resText"></div>
```

```
//1.定义一个Ajax函数,通过该函数来异步获取信息
function(){
	//2.声明一个空对象用来装XMLHttpRequest
    var xmlhttpreReq = null;
}
```