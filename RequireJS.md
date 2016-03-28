---
#RequireJs简介
标签（空格分隔）： RequireJs

---

#简介

#使用
## 加载JavaScript文件
requireJS的目标是鼓励代码模块化，它使用了不同于传统的`script`标签脚本加载步骤。可以用他来加速，优化代码，但其主要目的还是为了代码模块化。他鼓励在使用脚本时以moduleID代替URL地址。

RequireJS以相对于baseUrl的地址来加载所有的代码。页面顶层`<script>`标签有一个特殊的属性data-main，require.js使用它来启动脚本加载过程，而baseUrl一般设置到与该属性相一致的目录。下列示例中展示了baseUrl的设置：
```
<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
    
<script data-main="scripts/main.js" src="scripts/require.js"></script>
```

baseUrl亦可以通过RequireJS config手动设置。如果没有显示指定config以及data-main，则默认baseUrl为包含RequireJS的那个HTML页面所需的页面。

RequireJS默认假定所哟的依赖资源是js脚本，因此无需再moduleID上再加."js"后缀，RequireJS再进行module ID到path的解析式会自动补上后缀。

一般来说，最好还是使用baseUrl及"paths" config去去设置moduleID。他会给你带来额外的灵活性，便于脚本重命名，从定位等。同时，为了避免凌乱的配置，最好不要使用多级嵌套的目录层次来组织代码，而是要么将所有的脚本放置在baseUrl中，要么分置为项目库/第三方库的一个扁平结构，如下：
```
- www/
 - index.html
 - js/
    - app/
        -sub.js
    - lib/
        - jqurey.js
        - canvas.js
    - app.js
```

index.html：
`<script data-min="js/app.js" src="js/require.js"></script>`

app.js
```
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});
```

注意在示例中，三方库如jQuery没有将版本号包含在他们的文件中。

##data-main入口点
require.js在加载的时候UI检查data-main属性
```
<!--when require.js loads ti will inject another script tag(with async attribute) for scripts/main.js-->
<script data-main="script/main" src="scripts/require.js"></script>
```

