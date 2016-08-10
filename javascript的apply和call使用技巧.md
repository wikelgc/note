
# javascript的call和apply


## 1.call和apply的区别
ECAMScript3给Function的原型定义两个方法：Function.protype.call和Function.prototype.apply。他们的作用一模一样，区别仅在于闯入参数形式的不同。

- apply接受两个参数，第一个参数指定了函数体内this对象的指向，第二个参数为一个带下标的集合，这个集合可以是数组，也可以是类数组，apply方法把这个集合中元素作为参数传递给被调用的函数；

    ```javascript
    var func = function(){
        aler([a,b,c]); //输出[1,2,3]
    };
    func.apply(null,[1,2,3]);
    ```
    
    这段代码中那个，参数1，2，3被放在数组中一起传入func函数，他们分别对应func参数列表中的a,b,c。
    
- call传入的参数不固定，跟apply相同的是，第一个参数也是代表函数体内的this指向，从第二个参数后开始往后，每个参数依次传入参数：

```javascript
var func = function(a,b,c){
	alert([a,b,c]);//输出[1,2,3]
};
func.call(null,1,2,3);
```

    当调用一个函数时，javascript的解释器并不会计较形参和实参在数量，类型以及顺序上的区别，javascript的参数内部就是使用一个数组来表示的。从这个意义上来说，apply比call的使用率更高，不必关系具体多少参数被传入函数。

    call是包装在apply上面的语法糖，如果我们明确知道函数要接受多少个参数，而且想要一目了然地表达形参和实参的对应关系，那么也可以使用call来传送参数。

    当使用call或者apply的时候，如果传入的第一个参数为null，函数体内的this会指向默认的宿主对象，在浏览器中则是window
    ```javascript
    var func = function(){
        alert(this==window)；//输出true
    }
    func.apply(null,[1,2,3]);
    ```

    注意：如果是在严格模式下，函数体内的this还是为null：
    
    ```javascript
    var func = function(){
        "use strict"
        alert(this === null); //输出true
    };

    func.apply(null,[1,2,3]);
    ```
    
## 2.callj和apply的用途

call和apply在实际开发中的用途
1. 改变this的指向：call和apply最常见的用途是改变函数内部的this指向：

    ```javascript
    var obj1 = {
        name : "sven"
    }

    var obj2 = {
        name:"anne"
    }

    window.name="window"

    var getName=function(){
        alert(this.name);
    };

    getName();//window; 如果是在node中：undefined
    getName.call(obj1)//sven;
    getName.call(obj2);//anne
    ```

	在其他开发环境中，经常遇到this指向被不经意改变的情景：

    ```javascript
    document.getElementById('div1').onclick=function(){
        alert(this.id);//输出div1
    }

    document.getElemnetById('div1').onclick=function(){
        alert(this.id);//输出div1
        var func = function(){
            alert(this.id);//输出undefined；
        }
        func();
    };

    //这时可以通过call来修正func函数内的this，使其依然指向div：
    document.getElementById('div1').onclick=function(){
        var func = function(){
            alert(this.id);
        }
        func.call(this);
    };
    ```
    
2. Function.prototype.bind:浏览器都实现了内置的Function.prototype.bind，用来指定函数内部的this指向，即使没有原生的Function.prototype.bind实现。也可以直接用代码模拟一个：

    ```javascript
    Function.prototype.bind = function(context){
        var self = this;//保存原函数
        return function(){
            return self.apply(context,arguments);
        }
    };

    var obj ={
        name:'sven'
    };

    var func = function(){
        alert(this.name); //输出sven
    },bind(obj);

    func();
    ```
3. 借用其他构造函数
