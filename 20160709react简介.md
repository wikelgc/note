# React简介

React是Facebook开源的一个用于构建用户界面的Javascript库，已经 应用于Facebook及旗下Instagram。

和庞大的AngularJS不同，React专注于MVC架构中的V，即视图。 这使得React很容易和开发者已有的开发栈进行融合。

React顺应了Web开发组件化的趋势。应用React时，你总是应该从UI出发抽象出不同 的组件，然后像搭积木一样把它们拼装起来：

不过，React定义组件的方式和AngularJS截然不同。如果说HTML是一个轮子，AngularJS 的指令/Directive则是给这个轮子镶了个金边，而React，重新造了个轮子： JSX。

React抛弃HTML另起炉灶的原因之一是性能的考虑：DOM操作非常之慢。React引入了 虚拟DOM的概念：开发者操作虚拟DOM，React在必要的时候将它们渲染到真正的 DOM上 —— 有点像游戏开发中的双缓冲区/Double Buffer帧重绘。

引入虚拟DOM的另一个好处是，容易引入不同的渲染引擎。比如将你的应用代码渲染 到真实的DOM，或者nodejs服务端的无头DOM，或者，iOS/Android平台组件 —— 这就是 React Native ：


## Hello React!

和AngularJS相比，上手React简单到让人震惊。

在引入React库之后，开发API就通过React对象暴露出来了。我们要做的、能做的，就是：

在虚拟DOM上创建元素，然后将它们渲染到真实DOM上。

在示例代码中使用了React对象的两个方法：

    createElement(type,[props],[children...]) - 在虚拟DOM上创建指定的React元素

参数type用来指定要创建的元素类型，可以是一个字符串或一个React组件类型。当使用 字符串时，这个参数应当是标准的HTML标签名称，比如：p、div、canvas等等。

参数props是可选的JSON对象，用来指定元素的附加属性，比如样式、CSS类等等。 我们在示例中简单的设置为null。

从第三个参数children开始的所有参数，都被认为是这个元素的子元素。考虑到 虚拟DOM好歹也是DOM，容易理解React需要通过这些子元素参数，让我们可以构造虚拟DOM树：

```javascript
    var el = React.createElement(
        "ul",
        null,
        React.createElement("li",null,"China"),
        React.createElement("li",null,"Japan"),
        React.createElement("li",null,"Korea")
    );
```

上面的例子在虚拟DOM中创建了一个具有三个li子元素的ul元素，看起来有点累。不过 想想，造一个轮子，总会付出一些代价的。

在示例中，我们简单地传入了一个文本子元素作为p元素的内容。

    render(element,container,[callback]) - 将虚拟DOM上的对象渲染到真实DOM上

参数element是我们使用createElement()方法创建的React元素，注意，不是HTML元素！

参数container是真实DOM中的HTML元素，作为渲染的目标容器，它的内容将被render()方法 的执行改变。

callback参数是可选的函数，当渲染完成或更新后被执行，通常我们不用它。

## 虚拟DOM

虚拟DOM是React的基石。

之所以引入虚拟DOM，一方面是性能的考虑。Web应用和网站不同，一个Web应用 中通常会在单页内有大量的DOM操作，而这些DOM操作很慢。

在React中，应用程序在虚拟DOM上操作，这让React有了优化的机会。简单说， React在每次需要渲染时，会先比较当前DOM内容和待渲染内容的差异， 然后再决定如何最优地更新DOM。这个过程被称为reconciliation。

除了性能的考虑，React引入虚拟DOM更重要的意义是提供了一种一致的开发方 式来开发服务端应用、Web应用和手机端应用：

VDOM

因为有了虚拟DOM这一层，所以通过配备不同的渲染器，就可以将虚拟DOM的内容 渲染到不同的平台。而应用开发者，使用JavaScript就可以通吃各个平台了。

相当棒的思路！


## React组件

在React中定义一个组件也是相当的容易，组件就是一个 实现预定义接口的JavaScript类：

    React.createClass(meta)

参数meta是一个实现预定义接口的JavaScript对象，用来 对React组件原型进行扩展。

在meta中，至少需要实现一个render()方法，而这个方法， 必须而且只能返回一个有效的React元素。

这意味着，如果你的组件是由多个元素构成的，那么你必须在外边包一个顶层 元素，然后返回这个顶层元素。比如我们创建一个布局组件：

    render:function(){
        return React.createElement(
            "div",null,
            React.createElement("div",null,"header"),
            React.createElement("div",null,"content"),
            React.createElement("div",null,"footer")
        );
    }

注意 ：你的React组件名称的首字母应当大写， 关于大小写的差异你会在后面发现。

在示例代码中，我们实现了一个液晶显示组件EzLedComp（为了更逼真一些， 定义了简单的样式，别忘了翻看一下），你应该会注意到div元素的样式类是用 className而不是class声明的，这是因为class 是JavaScript的保留字，渲染后，真实的DOM还会是：

    <div class="ez-led">Hello, React!</div>

组件定义以后，和标准HTML标签一样，可以使用createElement()方法 创建元素，只是这时，第一个参数是我们定义的组件类，而不是标签名字符串：

    React.createElement(EzLedComp);
    
    
## 轮子来了：JSX

React引入虚拟DOM以后，创建DOM树得在JavaScript里写代码，这使得界面定义 变得相当繁琐。比如我们创建两排的液晶组件得这么写：

    render: function(){
        return React.createElement(
            "div",null,
            React.createElement("div",{className:"ez-led"},"Hello, React!"),
            React.createElement("div",{className:"ez-led"},"2015-04-15")
        );
    }

而它们被渲染后对应的声明式HTML则简单明了：

    <div>
        <div class="ez-led">Hello, React!</div>
        <div class="ez-led">2015-04-15</div>
    </div>

这还只是两层的树，要是需要一棵大树呢？

heartbreak

填一个坑，需要挖另一个坑。于是，JSX来了。

JSX是对JavaScript语法的扩展，它让我们可以在JavaScript代码中以类似HTML 的方式创建React元素。简单的说，每当你需要使用createElement()时， 就把这个函数调用部分用渲染目标HTML替换（提醒下，不完全一致，比如class属性 要用className代替）：

    //JavaScript
    var e = React.createElement(
            "ul",null,
            React.createElement("li",null,"China"),
            React.createElement("li",null,"Japan"),
        );
    //JSX = JavaScript + XML like extension
    var e = 
     
    *   China
    *   Japan;

说实话，这种写法让代码看起来相当闹心。但相比写大段的脚本来创建DOM树， 这至少效率高吧。好在，React不强制使用JSX，如果你是强迫症患者， 确实感觉到不舒服，那么，可以不用它。


##使用JSX

很显然，增加了这些XML语法的脚本不能再称为JavaScript了，使用上 略有区别。

    指定脚本类型

在html文件中引入的JSX脚本，需要指定类型为text/jsx：

    //内联脚本
    <script type="text/jsx">...</script>
    //外部脚本
    <script src="a.js" type="text/jsx"></script>

    引入JSX语法转换库

在html中使用JSX，还需要引入JSX语法转换库JSXTransform.js。 这个库加载后，将在DOM树构造完成后（通过监听DOMContentLoaded事件）处理 JSX脚本：

    1. 搜索DOM树中的script节点，如果其类型为text/jsx则进行后续处理
    2. 读取script节点的内容，将其转化为JavaScript代码
    3. 构造一个新的script元素，设置其内容为转化结果代码，并追加到DOM树head元素中

JSXTransform.js引入后通过全局对象JSXTransformer提供了API接口， 我们可以使用transform()方法来模拟这个语法自动转换的过程。

在右边的示例代码中，为了避免自动转换，我们将script元素的类型设置为text/jsx2， 同时为了简化DOM元素定位，给它加了一个id。

点击按钮，你就可以看到转换结果。查看代码，理解自动转换的步骤。