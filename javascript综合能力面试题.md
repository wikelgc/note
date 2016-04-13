---
javascript综合能力的面试题
---

```javascript
function Foo(){
	getName = function(){alert(1)};
    return this;
}

Foo.getName = function(){alert(2)};
Foo.protype.getName=function(){alert(3)};
var getName=function(){alert(4)};
function getName(){alert(5)};


Foo.getName();//2
getName();//4
Foo().getName();//1
getName();//1
new Foo.getName();//2
new Foo().getName();//1
new new Foo().getName(); //
```

解析
>此题涉及的知识点众多，包括变量地定义提升，this指针指向，运算符优先级，原型，继承，全局变量污染，对象属性及原型属性优先级等等。

>1. Foo.getName自然是访问Foo函数上存储的静态属性，自然是2，
>2. 提升的函数声明会覆盖提升的变量申明，但最终的赋值会再次覆盖function getName声明。
>3. 外层作用域getName变量，找到了，也就是第二问中的alert(4)函数，将此变量赋值为 function(){alert(1)};`(注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量)`

>4.因为调用getName()时，相当于调用了window.getName(),因为这个变量已经被Foo函数修改了，所以答案跟第三问相同。

>5.由于点(.)的优先级高于new操作，所以相当于：`new (Foo.getName)();`,所以将getName函数作为构造函数来执行，遂弹出2.

>6.括号的优先级高于new，实际执行为`(new Foo()).getName()`,因为Foo构造函数中没有为实例化对象添加任何属性，遂到当前对象的原型对象中去选择getName，所以是3.

>7.=> `new ((new Foo()).getName)();`,先初始化实例化对象，然后将其原型的getName函数作为构造函数再次new。