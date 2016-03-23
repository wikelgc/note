---
javascript前端框架分类
---

>从内部架构和理念划分，目前的javascript框架可以划分为5类

##第一种

出现的是以命名空间为导向的类库或框架，如创建一个数组用`new Array()`,生成一个对象用`new object`,完全的`java`风格。所以可以以某个对象为跟，不断为它添加对象属性或者二级对象属性来组织代码，金字塔般地累叠起来。代表作如早期的`YUI`和`EXT`。

##第二种

出现以类工厂为导向的框架，如著名的`protopyte`,还有`mootools`,`Base2`,`Ten`。它们基础上处理最基本的命名空间，其他模块都是由一个类工厂衍生出来的类对象。尤其是mootools1.3,把所有类型都封装成Type类型。

##第三种

就是以`jQuery`为代表的以选择器为导向的框架，整个框架或库主体是一个特殊类数组对象，方便集化操作--因为选择器通常是一下子选择到N个元素节点，于是便一并处理了。jQuery包含了几样了不起的东西："无new实例化"技术，$(expr)就是放回一个实例，不需要显示的new出来；get first set all访问规则：数据缓存系统。这样就可以复制节点实践，此外，IIFE(immediately Invoked Function Expression)也被发掘出来

第四种
就是以加载器串联起俩的框架，他们都有复数个javascript文件，每个javascript文件都以固定的规则编写。其中最著名的莫过于AMD。模块化是javascript走向工业化的标志。许多企业内部框架基本都采取这种架构，如Dojo，YUI，kissy，qwray和mess等


第五种

就是具有明确分层架构的`MV*`架构。首先是javascript MVC(CanJS),backbonejs,spinejs,然后是更符合前端实际的MVVC框架。如knock,ember,angular,avalon,winjs.在MVVC框架中，原有的DOM操作被声明式绑定取代了，由框架自行处理，用户只需专注于业务代码。