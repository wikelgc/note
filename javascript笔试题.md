---
javascript笔试题
---
####1. this
```javascript
var length = 10;
function fn(){
	console.log(this.length);
}

var obj = {
	length:5,
    method:function(fn){
    	fn();
        arguments[0]();
    }
};

obj.method(fn,1);
```

答：输出10，2
> 第一次执行的环境是window对象，即fn的this指向的window，所以输出的10，第二次执行时相当于arguments调用方法，this指向argument，而这里传了长度为2.

####1. var和函数的提前声明

```javascript
function fn(a){
	console.log(a);
    var a=2;
    function a(){};
    console.log(a);
}

fn(1);
```
答：function a(){} 2
> var和function是会提前声明的，但是function是优于var声明的。所以提前声明输出的a是个function，然后代码往下执行a进行重新赋值，而第二次输出是2；


####1. 局部变量和全局变量

```javascript
var f=true;
if(f===true){
	var a=10;
}

function fn(){
	var b=20;
    c=30;
}

fn();
console.log(a);
console.log(b);
console.log(c);
```
答: 10 报错 20

>  只有function(){}内声明的变量才是局部变量，while{}，if{}，{}之内的都是全局变量(除非本身包含在function内);

####1. 变量隐式声明

```
if('a' in window){
	var a=10;
}
```
答：10
> function和var会提前声明，而{...}内部的变量也会提前声明。所以a变量已经被声明，于是'a' in window返回true，a被赋值。

####1. 给基本类型数据添加属性，不报错，但取值时是undefined

```
var a=10;
a.pro = 10;
console.log(a.pro+a);

var s = "hello";
s.pro="world";
console.log(s.pro+s);
```

答：NaN undefinedhello
>给基本类型数据加属性不报错，但引用的话返回undefined，10+undefined返回NaN，而undefined和string想加时转变成了字符串。


####1. 函数声明优于变量声明

```
console.log(typeof fn);
function fn(){};
var fn;
```
答案：function
>函数声明由于优于变量声明。所以函数声明会覆盖变量声明。


####7.判断一个字符串中出现次数最多的字符，并统计次数

```javascript
//hash table方式
var s="aaabbbcccaaabbbaaa";
var obj={}
var maxn=-1;
var letter;
for(var i=0;i<s.length;i++){
	if(obj[s[i]]){
		obj[s[i]]++;
        if(obj[s[i]]>max){
        	maxn = obj[s[i]];
            letter=s[i];
        }
    }
    else{
    	obj[s[i]]=1;
        if(obj[s[i]]>maxn){
        	maxn = obj[s[i]];
            letter=s[i];
        }
    }
}

alert(letter+":"+maxn);

//正则方式
var s='aaabbbcccaaabbbaaa';
var a=s.split('');
a.sort();
s=a.join('');

var pattern = /(\w)\1*/g;
var ans = s.match(pattern);
ans.sort(function(a,b){
	return a.length<b.length;
});
console.log(ans[0][0]+":"+ans[0].length);

```


