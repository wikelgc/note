
# Gulp入门教程

　gulp是前端开发过程中一种基于流的代码构建工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

　gulp是基于Nodejs的自动任务运行器， 她能自动化地完成 javascript、coffee、sass、less、html/image、css 等文件的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。

## Gulp简介
### 核心

   流:简单来说就是建立在面向对象基础上的一种抽象的处理数据的工具。在流中，定义了一些处理数据的基本操作，如读取数据，写入数据等，程序员是对流进行所有操作的，而不用关心流的另一头数据的真正流向。流不但可以处理文件，还可以处理动态内存、网络数据等多种数据形式。

而gulp正是通过流和代码优于配置的策略来尽量简化任务编写的工作。这看起来有点“像jQuery”的方法，把动作串起来创建构建任务。早在Unix的初期，流就已经存在了。流在Node.js生态系统中也扮演了重要的角色，类似于Unix将几乎所有设备抽象为文件一样，Node将几乎所有IO操作都抽象成了stream的操作。因此用gulp编写任务也可看作是用Node.js编写任务。当使用流时，gulp去除了中间文件，只将最后的输出写入磁盘，整个过程因此变得更快。

### 特点
- 易于使用
	通过代码由于配置的策略，Gulp让简单的任务简单，复杂的任务可管理。

- 插件高质
	Gulp严格的插件指南确保如你期望的那个简洁高质的工作
    
- 构建快速
	利用Node.js流的威力，可以快速的构建项目并减少IO操作
- 易于学习
	通过最少的API，掌握Gulp毫不费力
 
### 使用
- 建立gulpfile.js文件

    gulp也需要一个文件作为它的主文件，在gulp中这个文件叫做gulpfile.js。新建一个文件名为gulpfile.js的文件，然后放到你的项目目录中。之后要做的事情就是在gulpfile.js文件中定义我们的任务了。下面是一个最简单的gulpfile.js文件内容示例，它定义了一个默认的任务。

    ```javascript
    var gulp = require('gulp');
    gulp.task('default',function(){
        console.log('hello world');
    });
    ```
- 运行gulp任务
    要运行gulp任务，只需切换到存放gulpfile.js文件的目录(windows平台请使用cmd或者Power Shell等工具)，然后在命令行中执行gulp命令就行了，gulp后面可以加上要执行的任务名，例如gulp task1，如果没有指定任务名，则会执行任务名为default的默认任务。

## 入门指南
- 全局安装gulp：
```node
npm install --global gulp
```
 
- 作为项目的开发依赖安装
```node
npm install --save-dev gulp
```

- 在项目根目录创建一个名为gulpfile.js的文件
```javascript
var gulp = require('gulp');
gulp.task('default',function(){
	//放置默认的任务代码
})
```

- 运行gulp
```node
gulp
```

>默认名为default的任务将会被运行。

>想要单独执行特定的任务
>```node
>gulp <task> <othertask>
>```


## gulp API文档

&nbsp;&nbsp;在介绍gulp API之前，我们首先来说一下gulp.js工作方式。在gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的stream，然后可以通过stream的pipe()方法把流导入到你想要的地方，比如gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是我们应用gulp的一个原因。

&nbsp;&nbsp;gulp的使用流程一般是：首先通过gulp.src()方法获取到想要处理的文件流，然后把文件流通过pipe方法导入到gulp的插件中，最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中，gulp.dest()方法则把流中的内容写入到文件中。

```node
var gulp = require('gulp');
gulp.src('script/jquery.js')         // 获取流的api
    .pipe(gulp.dest('dist/foo.js')); // 写放文件的api
```

### gulp.src(globs[,options])
输出(Emits)符合所提供的匹配模式(glob)或者匹配模式的数组(array of globs)的文件。将返回一个Vinyl files的stream他可以被piped到别的插件中。

```javascript
gulp.src("client/templates*.jade")
	.pipe(jade())
    .pipe(minify())
    .pipe(gulp.dest('build/minified_templates'));
```

gulp.src()方法是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息。其语法为：

```javascript
gulp.src(globs[, options]);
```

globs参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组;类型为String或 Array。我们在前一节中已经讲过了globs的匹配规则，这里就不在详述。

当有多种匹配模式时可以使用数组

```javascript
gulp.src(['js/*.js','css/*.css','*.html'])
```

- globs
 - 类型：String和Array
 - 所要读取的glob或者包含globs的数组。
 
options为可选参数。以下为options的选项参数:

- options
 - 类型：Object
 - 通过glob-stream所传递贵gulp-glob的参数
 
- options.buffer
 - 类型：boolean 默认值true
 - 如果该项被设置为false，那么将会以stream方式返回contents而不是文件buffer的形式。

- options.read
 - 类型：boolean 默认值：true
 - 如果该项被设置为默认值，那么file.contents会放回空值，也就是不会读取文件。

- options.base
 - 类型：String  默认值：将会加载glob之前

```javascript
gulp.src('client/**/*.js')//匹配'client/js/somedirsomefile.js'并且将base解析为'client/js/'
	.pipe(minify())
    .pipe(gulp.dest('build'));//写入'build/somedir/somefile.js'
    
gulp.src('client/js/**/*.js',{base:'client'})
	.pipe(minify())
    .pipe(gulp.dest('build'));//写入'build/js/somedir/somefile.js'
```

### 写文件:gulp.dest(path[,options])
gulp.dest()方法是用来写文件的，其语法为：
```
gulp.dest(path[,options])
```

path为写入文件的路径；

options为一个可选的参数对象，以下为选项参数：

- options.cwd

 - 类型： String 默认值： process.cwd()

 - 输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效。

- options.mode

 - 类型： String 默认值： 0777

 -八进制权限字符，用以定义所有在输出目录中所创建的目录的权限。

### 定义任务:gulp.task(name[,deps],fn)
gulp.task方法用来定义任务，内部使用的是Orchestrator(用于排序、执行任务和最大并发依赖关系的模块)，其语法为：
```
gulp.task(name[, deps], fn)
```

- name:任务名
- deps:是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数；
- fn:为任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。
```
gulp.task('greet', function () {
   console.log('Hello world!');
});
```

### 监视文件:gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])

### gulp.watch(glob[, opts], tasks)

### gulp.watch(glob[, opts, cb])

### 执行任务:gulp.run()
gulp.run()表示要执行的任务。可以会使用单个参数的形式传递多个任务，如下代码：
```node
gulp.task（"end",function(){
	gulp.run('task1','task2','task3');
}）
```
