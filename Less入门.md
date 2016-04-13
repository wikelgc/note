---
Less入门教程
---

##简介
LESSCSS是一种动态样式语言，属于CSS预处理语言的一种，它使用类似CSS的语法，为CSS的赋予了动态语言的特性，如变量、继承、运算、函数等，更方便CSS的编写和维护。

LESSCSS可以在多种语言、环境中使用，包括浏览器端、桌面客户端、服务端。

###变量

- LESS源码

```less
@color: #4D926F;

#header {
    color: @color;
}
h2 {
    color: @color;
}
```

- 编译后的CSS

```css
#header {
    color: #4D926F;
}
h2 {
    color: #4D926F;
}
```

###混合(Mixins)
混合可以将一个定义好的class A轻松的引入到另一个class B中，从而简单实现class B继承class A中的所有属性。我们还可以带参数地调用，就像使用函数一样。

- Less源码

```less
.rounded-corners (@radius: 5px) {
    -webkit-border-radius: @radius;
    -moz-border-radius: @radius;
    -ms-border-radius: @radius;
    -o-border-radius: @radius;
    border-radius: @radius;
}

#header {
    .rounded-corners;
}
#footer {
    .rounded-corners(10px);
}
```

- 编译后的CSS

```css
#header {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
}
#footer {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
}
```

###嵌套
我们可以在一个选择器中嵌套另一个选择器来实现继承，这样很大程度减少了代码量，并且代码看起来更加的清晰。

- Less

```
#header {
    h1 {
        font-size: 26px;
        font-weight: bold;
    }
    p {
        font-size: 12px;
        a {
            text-decoration: none;
            &:hover {
                border-width: 1px
            }
        }
    }
}
```

- 编译后的css

```
#header h1 {
    font-size: 26px;
    font-weight: bold;
}
#header p {
    font-size: 12px;
}
#header p a {
    text-decoration: none;
}
#header p a:hover {
    border-width: 1px;
}
```

###函数和运算
运算提供了加，减，乘，除操作；我们可以做属性值和颜色的运算，这样就可以实现属性值之间的复杂关系。LESS中的函数一一映射了JavaScript代码，如果你愿意的话可以操作属性值。

- Less源码

```
@the-border: 1px;
@base-color: #111;
@red:        #842210;

#header {
    color: (@base-color * 3);
    border-left: @the-border;
    border-right: (@the-border * 2);
}
#footer {
    color: (@base-color + #003300);
    border-color: desaturate(@red, 10%);
}
```

- 编译后的css

```
#header {
    color: #333;
    border-left: 1px;
    border-right: 2px;
}
#footer {
    color: #114411;
    border-color: #7d2717;
}
```

##语言特性

作为CSS的一种扩展，LESSCSS不仅向下兼容CSS的语法，而且连新增的特性也是使用CSS的语法。这样的设计使得学习LESS很轻松，而且你可以在任何时候回退到CSS。



