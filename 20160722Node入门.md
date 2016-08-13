# Node入门


## 基于Node.js的web应用

- 新建一个HTTP服务器
```
//server.js
var http = require('http');
http.CreateServer(function(request,response){
	respone.writeHead(200,{"Content-Type":"text/plain"});
    respone.write("Hello world");
    respone.end();
}).listen(8888);
```

	测试这段代码`node server.js`,接下来打开浏览器访问'http://localhost:8080/',会看到一个'hello world'的网页