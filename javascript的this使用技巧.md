======
javascript的this使用技巧
------

##this
javascript中的this总是指向一个对象，而具体指向那个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的对象。

###this的指向
在javascript的实际运用中，this的指向大致可以分为以下四种：
- 作为对象的方法调用
- 作为普通函数调用
- 构造器调用
- Function.prototype.call或Function.prototype.apply调用。

###1.作为函数的方法调用
当函数作为对象的方法被调用时，this指向该对象
```javascript
var obj={
	a:1;
    getA:function(){
    	alert(this==abj);//输出true
        alert(this.a);//输出：1
    }
}
obj.getA();
```

###2.作为普通函数调用
当函数不作为对象的属性被调用时，也就是普通函数方式是，此时的this总是指向全局函数。在浏览器的javascript中，全局函数指的的window对象。
```javascript
//demo-1
window.name="globalName";
var getName=function(){
	return this.name;
};

console.log(getName); //输出globalName

//demo-2

window.name="globalName";
var myObject={
	name = "sven";
    getName:function(){
    	return this.name;
    };
};

var getName = myObject.getName;//等于：myObject[this.name]
console.log(getName);//globalName
```

注意：在ECMAScript5在strict模式下，this已经被规定为不会指向全局对象，而是undefined：
```javascript
function func(){
	'use strict'
    alert(this);//输出undefined
}

```

###3.构造器调用
javascript中没有类，但是可以从构造器中创建对象，同时也提供new运算符，使得构造器看起来更像一个类。

- 除了宿主停供的一些内置函数，大部分javascript函数都可以当作构造器使用。构造器的外表跟普通函数一模一样，他们的区别在于被调用的方式。当用new运算符调用函数是，该函数总是放回一个对象，通常情况下，构造器里的this就指向放回的这个对象：

    ```javascript
    var MyClass = function(){
        this.name = 'sven';
    };

    var obj = new MyClass();//用new运算符调用函数是，该函数总是返回一个对象
    alert(obj.name); //输出sven
    ```

- 使用new调用构造器时，要注意一个问题，如果构造器显式的放回了一个object类型的对象，那么此次运算结果会返回这个对象。

```javascript
var MyClass = function(){
	this.name = 'sven';
    return {
    	name ： "anne"
    }
};

var obj = new MyClass();//构造器显式返回一个object类型的对象
console.log(obj.name); //输出： anne
```

- 如果构造器不显式返回任何数据，或者返回一个非对象类型的数据，就不会造成上诉问题：

```javascript
var MyClass = function(){
	this.name = 'sven';
  	return 'anne';
};

var obj = new MyClass(); //和第一种情况一样
console.log(obj.name); //输出： sven
```


###4.this在call和apply中的调用
和普通函数相比，Function.prototype.call和Function.protype.apply可以动态的改变传入函数的this：
```javascript
var obj={
	name:'sven',
    getName:function(){
    	return this.name;
    }
};

var obj = {
	name:"anne"
};

console.log(obj1.getName()); //sven
console.log(obj1.getName.call(obj2));//输出：anne；使用Function.protype.call改变函数的this指向的对象
```

