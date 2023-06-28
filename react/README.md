# React 入门

[官网](https://react.dev/)

## React 简介

### React 为何物

React：用于构建用户界面的 JavaScript 库。由 `Facebook` 开发且开源。

### 为何学习 React

原生 JavaScript 的痛点：

- 操作 DOM 繁琐、效率低
- 使用 JavaScript 直接操作 DOM，浏览器进行大量重绘重排
- 原生 JavaScript 没有组件化编码方案，代码复用率低

React 的特点：

- 采用组件化模式、声明式编码，提高开发效率和组件复用率
- 在 `React Native` 中可用 React 语法进行移动端开发
- 使用虚拟 DOM 和 Diffing 算法，减少与真实 DOM 的交互

## React 初体验

### 来一发 Hello React

相关 JS 库：

- `react.development.js` ：React 核心库
- `react-dom.development.js` ：提供 DOM 操作的 React 扩展库
- `babel.min.js` ：解析 JSX 语法，转换为 JS 代码

```html
<!-- 准备好一个“容器” -->
<div id="test"></div>

<!-- 引入react核心库 -->
<script type="text/javascript" src="../js/react.development.js"></script>
<!-- 引入react-dom，用于支持react操作DOM -->
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<!-- 引入babel，用于将jsx转为js -->
<script type="text/javascript" src="../js/babel.min.js"></script>

<!-- 此处一定要写babel，表示写的不是 JS，而是 JSX，并且靠 babel 翻译 -->
<script type="text/babel">
  //1.创建虚拟DOM
  // 不要写引号，因为不是字符串
  const VDOM = <h1>Hello,React</h1>;

  //2.渲染虚拟DOM到页面
  // 导入核心库和扩展库后，会有 React 和 ReactDOM 两个对象
  ReactDOM.render(VDOM, document.getElementById("test"));
</script>
```

### 创建虚拟 DOM 的两种方式：JS 和 JSX

- 使用 JS 创建虚拟 DOM 比 JSX 繁琐
- JSX 可以让程序员更加简单地创建虚拟 DOM，相当于语法糖
- 最终 babel 会把 JSX 语法转换为 JS

```html
<script type="text/javascript">
  //1.使用 React 提供的 API 创建虚拟DOM
  const VDOM = React.createElement(
    "h1",
    { id: "title" },
    React.createElement("span", {}, "Hello,React")
  );
  //2.渲染虚拟DOM到页面
  ReactDOM.render(VDOM, document.getElementById("test"));
</script>
```

```html
<script type="text/babel">
  //1.创建虚拟DOM
  const VDOM = (
    <h1 id="title">
      <span>Hello,React</span>
    </h1>
  );
  //2.渲染虚拟DOM到页面
  ReactDOM.render(VDOM, document.getElementById("test"));
</script>
```

### 虚拟 DOM && 真实 DOM

关于虚拟 DOM：

1. 本质是 Object 类型的对象（一般对象）
2. 虚拟 DOM 比较“轻”，真实 DOM 比较“重”，因为虚拟 DOM 是 React 内部在用，无需真实 DOM 上那么多的属性。
3. 虚拟 DOM 最终会被 React 转化为真实 DOM，呈现在页面上。

```html
<script type="text/babel">
  const VDOM = (
    <h1 id="title">
      <span>Hello,React</span>
    </h1>
  );
  ReactDOM.render(VDOM, document.getElementById("test"));

  const TDOM = document.getElementById("demo");
  console.log("虚拟DOM", VDOM);
  console.log("真实DOM", TDOM);
</script>
```

## JSX

### JSX 简介

- 全称：JavaScript XML
- React 定义的类似于 XML 的 JS 扩展语法；本质是 `React.createElement()` 方法的语法糖
- 作用：简化创建虚拟 DOM

### JSX 语法规则

- 定义虚拟 DOM 时，不要写引号
- 标签中混入 JS 表达式需要使用 `{}`
- 指定类名不用 `class`，使用 `className`
- 内联样式，使用 `style={ { key: value } }` 的形式
- 只能有一个根标签
- 标签必须闭合，单标签结尾必须添加 `/`：`<input type="text" />`
- 标签首字母小写，则把标签转换为 HTML 对应的标签，若没有，则报错
- 标签首字母大写，则渲染对应组件，若没有定义组件，则报错

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>jsx语法规则</title>
    <style>
      .title {
        background-color: orange;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div id="test"></div>
    ...
    <script type="text/babel">
      const myId = "aTgUiGu";
      const myData = "HeLlo,rEaCt";

      const VDOM = (
        <div>
          <h2 className="title" id={myId.toLowerCase()}>
            <span style={{ color: "white", fontSize: "19px" }}>
              {myData.toLowerCase()}
            </span>
          </h2>
          <input type="text" />
        </div>
      );

      ReactDOM.render(VDOM, document.getElementById("test"));
    </script>
  </body>
</html>
```

### JSX 例子

注意区分：**JS 语句(代码)** 与 **JS 表达式**：

1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方

```js
a;
a + b;
demo(1);
arr.map();
function test() {}
```

2. 语句(代码)：

```js
if(){}
for(){}
switch(){case:xxxx}
```

```html
<script type="text/babel">
  let list = ['Angular', 'React', 'Vue'] const VDOM = (
  <div>
    <h1>前端js框架列表</h1>
    <ul>
      // React 会自动遍历数组
      {list.map((item, index) => {
        // Each child in a list should have a unique "key" prop.
        return <li key={index}>{item}</li>
      })}
    </ul>
  </div>
  ) ReactDOM.render(VDOM, document.getElementById('test'))
</script>
```

# React 面向组件编程

## 函数式组件

```html
<script type="text/babel">
  //1.创建函数式组件
  function MyComponent() {
    //此处的 this 是 undefined，因为 babel 编译后开启了严格模式
    console.log(this);
    return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>;
  }
  //2.渲染组件到页面
  ReactDOM.render(<MyComponent />, document.getElementById("test"));
</script>
```

要点：

- 组件名称首字母必须大写，否则会解析成普通标签导致报错，详见 JSX 语法规则
- 函数需返回一个虚拟 DOM
- 渲染组件时需要使用标签形式，同时标签必须闭合

渲染组件的过程：

- React 解析标签，寻找对应组件
- 发现组件是函数式组件，则调用函数，将返回的虚拟 DOM 转换为真实 DOM ，并渲染到页面中

## 类式组件

```html
<script type="text/babel">
  // 创建类式组件
  class MyComponent extends React.Component {
    render() {
      console.log("render中的this：", this);
      return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>;
    }
  }
  ReactDOM.render(<MyComponent />, document.getElementById("test"));
</script>
```

组件渲染过程：

- React 解析组件标签，寻找组件
- 发现是类式组件，则 `new` 该类的实例对象，通过实例调用原型上的 `render` 方法
- 将 `render` 返回的虚拟 DOM 转为真实 DOM ，渲染到页面上

## 组件实例核心属性 state

`state` 是组件实例对象最重要的属性，值为对象。又称为状态机，通过更新组件的 `state` 来更新对应的页面显示。

要点：

- 初始化 `state`
- React 中事件绑定
- `this` 指向问题
- `setState` 修改 `state` 状态
- `constructor` 、`render` 、自定义方法的调用次数

```html
<script type="text/babel">
  class Weather extends React.Component {
    // 调用一次
    constructor(props) {
      super(props);
      // 初始化 state
      this.state = { isHot: true, wind: "微风" };
      // 解决 this 指向问题
      this.changeWeather = this.changeWeather.bind(this);
    }
    // 调用 1+N 次
    render() {
      // 读取状态
      const { isHot } = this.state;
      return (
        <h1 onClick={this.changeWeather}>今天天气 {isHot ? "炎热" : "凉爽"}</h1>
      );
    }
    // 点一次调一次
    changeWeather() {
      const isHot = this.state.isHot;
      // 对 state 的修改是一种合并而非替换，即 wind 依然存在
      this.setState({ isHot: !isHot });
    }
  }

  ReactDOM.render(<Weather />, document.getElementById("test"));
</script>
```

简化版：

```html
<script>
  class Weather extends React.Component {
    state = { isHot: true, wind: "微风" };

    render() {
      const { isHot } = this.state;
      return (
        <h2 onClick={this.changeWeather}>天气{isHot ? "炎热" : "凉爽"}</h2>
      );
    }

    // 采用箭头函数 + 赋值语句形式
    changeWeather = () => {
      const isHot = this.state.isHot;
      this.setState = { isHot: !isHot };
    };
  }

  ReactDOM.render(<Weather />, document.getElementById("test"));
</script>
```
