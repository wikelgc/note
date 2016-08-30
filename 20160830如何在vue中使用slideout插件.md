# 如何在vue.js中使用slideout插件

## 安装插件

可以使用任何包管理工具安装

```
npm install slideout 

spm install slideout

bower install slideout 

component install mango/slideout
```

## 使用
首先需要在组件中创建标记,并且在组件中需要#menu和#content两个id

例如

```
<template>
	<nav id="menu" >
  <header>
    <h2>Menu</h2>
  </header>
</nav>

<main id="panel"  @click='toggleMenu'>
  <header>
    <h2>Panel</h2>
  </header>
</main>
</template>
```

然后继续在sytle添加样式,可以在style标签中的lang属性中添加css预处理器

```
<style lang="less">
.slideout-menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  width: 256px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: none;
}

.slideout-panel {
  position:relative;
  z-index: 1;
  will-change: transform;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}
</style>
```

最后添加事件监听
```
<script>
import Slideout from 'Slideout'
// import touch from 'touch'

export default{
	// 声明周期
  ready () {
    this.slideout = new Slideout({
      'panel': document.getElementById('panel'),
      'menu': document.getElementById('menu'),
      'padding': 256,
      'tolerance': 70,
      'touch': true,
      'enableTouch': true
    })
    // 添加DOM监听事件
    document.querySelector('.toggle-button').addEventListener('click', function () {
      this.slideout.toggle()
    })
    document.querySelector('.menu').addEventListener('click', function (eve) {
      if (eve.target.nodeName === 'A') { this.slideout.close() }
    })
    document.querySelector('.menu').addEventListener('click', function (eve) {
      if (eve.target.nodeName === 'A') { this.slideout.close() }
    })

    this.slideout.on('beforeopen', function () {
      document.querySelector('.fixed').classList.add('fixed-open')
    })

    this.slideout.on('beforeclose', function () {
      document.querySelector('.fixed').classList.remove('fixed-open')
    })
  },
  components: {
    Slideout
  },
  data () {
    return {
      slideout: {}
    }
  },
  methods: {
    toggleMenu () {
      this.slideout.toggle()
    }
  }
}

</script>
```

## 相关链接

[vue.js](https://vuejs.org.cn/)
[slideout](https://github.com/Mango/slideout)

