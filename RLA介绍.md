# RlA基础介绍


## RIA应用介绍
RIA(Rich Internet application):富互联网应用

RIA技术特点
- 局部更新
- 异步数据加载数据

SinglePageApplition：单页应用

RIA应用优点
- 表现了丰富
- 反应更加迅速
- 网络效率高
-

RIA应用的缺点
- 开发复杂
- 首屏加载时间长
- 对搜索引擎不友好


## 开发环境搭建
- NodeJS
- 适合的编辑器
- edp webserver
- esl & jquery

安装 edp webservver
```bash
npm install -g edp edp-webserver
npm install -g edp-project
```

初始化项目
```
mkdir ria
cd ria
edp project init
ls
edp webserver
```

##创建第一个页面
在ria文件夹中新建index.html页面
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RIA</title>
</head>
<body>
    RI
</body>
</html>
```

启动服务器
```bash
edp webserver
```

##ESL
[ESL](https://github.com/ecomfe/esl)是一个浏览器端，符合AMD的标准加载器，适合用于现代的Web浏览器端应用的入口和模块管理

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RIA DEMO</title>
</head>
<body>
    <div id="app"></div>
    <script src="http://s1.bdstatic.com/r/www/cache/ecom/esl/2-1-4/esl.js"></script>
    <script ser="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script>
    	require(['jquery'],function($){
        $('#app').html("hellow rls");
        
        });
    </script>
</body>
</html>
```
