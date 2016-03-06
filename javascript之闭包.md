====
javascript之闭包
----

对于javascript程序员来说，闭包(closure)是一个难懂有必须征服的概念，闭包的形参与变量的作用域以及变量的生存周期密切相关。

###变量作用域
变量的作用域，就是指变量的有效范围。当函数中声明一个变量的时候，如果该变量前面没有加上关键字var，这个变量就会变成全局变量。另一种情况是用var关键字在函数中声明变量，这时候变量即使局部变量，只有在该函数内部才能访问这个变量。

```
var func = function(){
	var a=1;
    alert(a); //输出：1
}；

func();
alert(a);//输出：Uncaught ReferenceError:a is not defined
```

在javascript中，只有在函数中才可以创造函数作用域：

```javascript
var a = 1;
var func = function(){
	var b = 2;
    var func2 =function(){
    	var c = 3;
    	alert(b);//输出：2
        alert(a);//输出：1
    }
    func2();
    alert(c);//c is not defined
}
func1();
```

###变量的生成周期

除了变量的作用于外，另外一个跟闭包有关的概念是变量的生成周期

对于全局变量俩是说，全局变量的生成周期当然是永久的，除非我们主动销毁这个全局变量。

而对于在函数内用var关键字声明的局部函数来说，当退出函数时，这些局部变量即都会随着被调用的结束而被销毁：

```
var func = function(){
	var a=1; //退出函数后局部变量a将被销毁
    alert(a);
};
func();
```

```javascript
var func = function(){
	var a=1;
    return function(){
    	a++;
        alert(a);
    }
};

var f = func();
f();//输出2
f();//3
f();//4
f();//5
```

跟我们之前的推论相反，当退出函数后，局部变量a并没有消失。这是因为当执行`var f = func()`时；f返回了一个匿名函数的引用，他可以访问到func()被调用时产生的环境，而局部变量a一直处在这个环境里。既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由。在这里产生了一个闭包结构，局部变量看起来被延续了。

####Test：
假设页面上有5个div节点，我们通过循环来给每个div绑定onclick事件，按照索引顺序，点击第一个div是弹出1，点击第二个div时弹出2，依次类推。
```javascript
<html>
	<body>
    	<djiv>1</div>
        <djiv>2</div>
        <djiv>3</div>
        <djiv>4</div>
        <djiv>5</div>
    </body>
    <script>
    	var nodes =document.getElementsByTagName('div');
        for(var i=0,len-nodes.length;i<len;i++){
        	nodes[i].onclick.function(){
            	alert(i);
            }
        };
    </script>
</html>
```

测试这段代码是会发现，无论点击那个div，最后弹出的结果都是5.这是因为div节点的onclick事件是被异步触发的，当事件被触发的时候。for循环早已经结束了。所以div在onclick事件函数中顺着作用域链从内到外查找变量i，查找到的值总是5.

解决方法是在闭包的帮助下，把每次循环的i值都封闭起来。当事件函数中顺着作用域链中从内到外查找变量i时，会先找到被封闭在闭包环境中的i，如果有5个div，这里的div分别是0，1，2，3，4.


```
for(var i=0,len=nodes.length;i<len;i++){
	(function(i){
        nodes[i].onclick()=function(){
            console.log(i);
        }
    })(1);
};
```

##闭包的更多作用

###1. 封装变量
闭包可以帮助把一些不需要暴露在全局的变量封装成"私有变量"。

example：
```javascript
var mult = function(){
	var a=1;
    for(var i=0,l=arguments.length;i<l;i++){
    	a=a*arguments[i];
    }
    return a;
};
```

优化：

```
var mult = (function(){
	var cache ={};
    var calculate=function(){ //封闭calculate函数
    	var a=1;
        for(var i=0,l=arguments.length;i<l;i++){
        	a=a*argumentsp[i];
        }
        return a;
    };
    
    return function(){
    	var args=Array.prototype.join.call(arguments,'');
        if(args in cache){
        	return cache[args];
        }
        return cache[args]=calculate.apply(null,arguments);
    }
})();
```

###2.延续局部变量的寿命

img对象经常用于进行数据上报

```
var report = function(){
	var img=new Image();
   	img.src=src;
}
report("http://www.xxx.com/getUserInfo");
```

但是通过查询后台的记录我们得知，因为一些低版本的浏览器的实现存在bug，这些浏览器的下是使用report函数进行数据上报会丢失30%左右的数据。而通过把img变量用闭包封闭起来，能解决请求丢失问题：
```
var report = (function(){
	var imgs=[];
    return function(src){
    	var img = new Image();
        imgs.push(img);
        img.src=src;
    }
})();
```


###3.闭包和面向对象设计
过程和数据的结合是形容面向对象中的"对象"时经常使用的表达。对象以方法的形式包含的过程，而闭包则是在过程中以环境的形式包含了数据。通常用面向对象思想能实现的功能，用闭包也能实现。

####TEST
```
var extent = function({
	var value = 0;
    return {
    	call:function({
        	value++;
            console.log(value);
        })
    }
});

var extent = extent();
extent.call();//输出:1
exrent.call();//输出:2
excent.call();//输出:3
```

转化成面向对象的写法，就是：
```
var extent={
 value:0,
 call:function(){
 	this.value++;
    console.log(this.value);
 }
}
extent.call();//输出:1
exrent.call();//输出:2
excent.call();//输出:3

//or
var Extent=function(){
	this.value=0;
}
Extent.prototype.call=function(){
	this.value++;
    console.log(this.value);
}

var extent = new Extent();
extent.call();//输出:1
exrent.call();//输出:2
excent.call();//输出:3
```

###4.闭包和内存管理
闭包是一个非常强大的特性，但普遍对其诸多误解。其中一种便是闭包会造成内存泄漏，所以要尽量避免使用。

跟闭包和内存泄漏有关系的地方是，使用闭包的同时比较容器形成循环引用，如果闭包的作用域链中保存者一些DOM节点，这时候就可能造成内存泄漏。
