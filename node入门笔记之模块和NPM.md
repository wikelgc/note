# node入门笔记之模块和NPM


## 模块
### 模块的概念
模块分为两类：原生模块和文件模块。原生模块即Node.js API提供的原生模块，原生模块在启动时已经被加载。文件模块为动态加载模块，加载文件模块的工作主要由原生模块module来实现和完成。

区别：原生模块在启动时已经被加载，而文件模块则需要通过调用Nodejs的require方法来实现加载。

### Node模块处理
- 原生模块的调用:应用Node提供的API require来加载相应的node模块，require加载成功后会返回一个Node模块的对象，该对象拥有该模块所有的属性和方法：

    ```javascript
    var http = require('http');

    //1."http":HTTP是node提供的原生模块，该模块中有createServer，require和get等多个方法和属性
    //2.httpModule：则为require原生的HTTP模块后返回的对象，通过该对象可以调用HTTP模块的所有属性和方法。
    //3.httpModule对象调用了HTTP模块中createServer和listen方法来创建简单的服务器对象。
    ```

- 文件模块调用方法：文件模块调用和原生模块调用的方法一致，当需要注意的是，其两者的加载方法存在一定的区别，即：文件模块加载时要指定文件的加载路径，而原生模块不需要。
	```javascript
    var test = require('/path/../test.js');
    //也可以 var test = require('/path/../test)
    
    ```
