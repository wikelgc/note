
# Webpack简介

Webpack 是一个模块打包器。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

## Webpack的特点和优势

Webapck 和其他模块化工具有什么区别呢？

- 代码拆分

Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的快。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

- Loader

Webpack 本身只能处理原生的 JavaScript 模块，但是 loader 转换器可以将各种类型的资源转换成 JavaScript 模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

- 智能解析

Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 JS 文件。甚至在加载依赖的时候，允许使用动态表达式 require("./templates/" + name + ".jade")。

-  插件系统

Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。
快速运行

Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。


## 安装

首先要安装 Node.js， Node.js 自带了软件包管理器 npm，Webpack 需要 Node.js v0.6 以上支持，建议使用最新版 Node.js。

用 npm 安装 Webpack：

    $ npm install webpack -g

此时 Webpack 已经安装到了全局环境下，本课程中我们已装好webpack，可以通过命令行 webpack -h 试试。

通常我们会将 Webpack 安装到项目的依赖中，这样就可以使用项目本地版本的 Webpack。

    # 进入项目目录
    # 确定已经有 package.json，没有就通过 npm init 创建
    # 安装 webpack 依赖
    $ npm install webpack --save-dev

Webpack 目前有两个主版本，一个是在 master 主干的稳定版，一个是在 webpack-2 分支的测试版，测试版拥有一些实验性功能并且和稳定版不兼容，在正式项目中应该使用稳定版。

    # 查看 webpack 版本信息
    $ npm info webpack
     
    # 安装指定版本的 webpack
    $ npm install webpack@1.12.x --save-dev
    
    
    
## Loader介绍

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过 require 来加载任何类型的模块或文件，比如 CoffeeScript、 JSX、 LESS 或图片。

先来看看 loader 有哪些特性？

    Loader 可以通过管道方式链式调用，每个 loader 可以把资源转换成任意格式并传递给下一个 loader ，但是最后一个 loader 必须返回 JavaScript。
    Loader 可以同步或异步执行。
    Loader 运行在 node.js 环境中，所以可以做任何可能的事情。
    Loader 可以接受参数，以此来传递配置项给 loader。
    Loader 可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
    Loader 可以通过 npm 发布和安装。
    除了通过 package.json 的 main 指定，通常的模块也可以导出一个 loader 来使用。
    Loader 可以访问配置。
    插件可以让 loader 拥有更多特性。
    Loader 可以分发出附加的任意文件