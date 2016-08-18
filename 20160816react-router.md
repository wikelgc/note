# react-router之onclick

```
<Link to = '/'>
	<Wrap onClick = {(event)=>{event.stopPropagation()}} />
</>
```

## 事件冒泡

1. event.stopPropagation：阻止当前事件的进一步冒泡行为。

2. event.preventDefault ：如果事件对象的cancelable属性为true,则该方法可以取消事件的默认动作.但并不取消事件的冒泡行为。

3. preventDefault 方法不会阻止该事件的进一步冒泡. event.stopPropagation 方法才有这样的功能.

备注：在事件触发后的任何阶段调用preventDefault方法来取消该事件,意味着该事件的所有默认动作都不会发生

列子：点击一个复选框时,触发click事件.该事件的默认动作是切换复选框的选择状态.下例演示了如何取消这个默认动作的发生:
```

<!DOCTYPE html>
<html>
<head>
<title>preventDefault example</title>
</head>
<body>
<p>请点击下面的复选框.</p>
<form>
<input type="checkbox" id="my-checkbox" />
<label for="checkbox">Checkbox</label>
</form>
<script>
    function stopDefAction(evt) {
        alert("preventDefault会阻止该复选框被勾选.")
        evt.preventDefault();
    }
    
    document.getElementById('my-checkbox').addEventListener(
        'click', stopDefAction, false
    );
</script>
</body>
</html>
```
下例演示了如何使用preventDefault()方法来阻止一个input元素内非法字符的输入：
```html
<!DOCTYPE html>
<html>
<head>
<title>preventDefault example</title>
</head>
<body>
<p>请输入一些字母,只允许小写字母.</p>
<form>
<input type="text" id="my-textbox"/>
</form>
<script type="text/javascript">
function checkName(evt) {
var charCode = evt.charCode;
  if (charCode != 0) {
    if (charCode < 97 || charCode > 122) {
      evt.preventDefault();
      alert("只能输入小写字母." + "\n"
            + "charCode: " + charCode + "\n"
      );
    }
  }
}
document.getElementById('my-textbox').addEventListener(
    'keypress', checkName, false
 );
</script>
</body>
</html>
```

## ES6箭头函数

ES6 可以使用箭头定义函数,不建议使用这种方法定义类。箭头函数相当于匿名函数，并且简化了函数定义。

箭头函数的引入有两个方面的影响：一是更简短的函数书写，二是对 this 的词法解析。

### 语法

1. 具有一个参数的简单函数

```javascript
let single = a => console.log(a);

single("on param"); // 'xx'
```

2. 没有参数的需要用在箭头钱加上小括号

```javascrpt
var log = () => {
    alert('no param')
}
```

3.  多个参数需要用到小括号，参数间逗号间隔

```javascript
var add = (a, b) => a + b
add(3, 8) // 11
```

4. 函数体多条语句需要用到大括号
```javascript
var add = (a, b) => {
    if (typeof a == 'number' && typeof b == 'number') {
        return a + b
    } else {
        return 0
    }
}

```
5. 返回对象时需要用小括号包起来，因为大括号被占用解释为代码块了

```javascript
var getHash = arr => {
    // ...
    return ({
        name: 'Jack',
        age: 33
    })
}
```

6. 直接作为事件handler

```javascript
document.addEventListener('click', ev => {
    console.log(ev)
})
```

7. 作为数组排序回调
```javascript
let arr = [1, 9 , 2, 4, 3, 8].sort((a, b) => a-b>0?1:-1)
arr // [1, 2, 3, 4, 8, 9]
```

### 注意点

1. typeof运算符和普通的function一样
```javascript
let func = a => a
console.log(typeof func); // "function"
```

2. . this固定，不再善变

```javascript
obj = {
    data: ['John Backus', 'John Hopcroft'],
    init: function() {
        document.onclick = ev => {
            alert(this.data);                // ['John Backus', 'John Hopcroft']
        }
    }
}
obj.init()
```
这个很有用，再不用写me，self，_this了，或者bind。

 

4. 箭头函数不能用new,箭头函数不能用作构造函数。箭头函数内部没有constructor方法，也没有prototype，所以不支持new操作

```javascript
var Person = (name, age) => {
    this.name = name
    this.age = age
}
var p = new Func('John', 33) // error
```

5. 不能使用argument,根据特点的浏览器而言
```javascript
var func = () => {
    console.log(arguments)
}
func(55) //
```

6. 一个空箭头函数,返回 undefined
```javascript
let empty = () => {};

(() => "foobar")() // 返回 "foobar" 

var simple = a => a > 15 ? 15 : a; 
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? a : b;

// Easy array filtering, mapping, ...

var arr = [5, 6, 13, 0, 1, 18, 23];
var sum = arr.reduce((a, b) => a + b);  // 66
var even = arr.filter(v => v % 2 == 0); // [6, 0, 18]
var double = arr.map(v => v * 2);       // [10, 12, 26, 0, 2, 36, 46]
```