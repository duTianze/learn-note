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

## 组件实例核心属性 props

每个组件对象都有 `props` 属性，组件标签的属性都保存在 `props` 中。

`props` 是只读的，不能修改。

### props 基本使用

```html
<script type="text/babel">
  class Person extends React.Component {
    render() {
      const { name, age, sex } = this.props;
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age}</li>
        </ul>
      );
    }
  }

  // 类似于标签属性传值
  ReactDOM.render(
    <Person name="Lily" age={19} sex="男" />,
    document.getElementById("test")
  );
</script>
```

### 批量传递 props

```html
<script type="text/babel">
  class Person extends React.Component {
    render() {
      const { name, age, sex } = this.props;
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age}</li>
        </ul>
      );
    }
  }

  const obj = { name: "Ben", age: 21, sex: "女" };
  ReactDOM.render(<Person {...obj} />, document.getElementById("test"));
</script>
```

### 限制 props

在 `React 15.5` 以前，`React` 身上有一个 `PropTypes` 属性可直接使用，即 `name: React.PropTypes.string.isRequired` ，没有把 `PropTypes` 单独封装为一个模块。

从 `React 15.5` 开始，把 `PropTypes` 单独封装为一个模块，需要额外导入使用。

```html
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
  class Person extends React.Component {
    render() {
      const { name, age, sex } = this.props;
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age}</li>
        </ul>
      );
    }
  }

  // 类型和必要性限制
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
    // 限制 speak 为函数
    speak: PropTypes.func,
  };

  // 指定默认值
  Person.defaultProps = {
    sex: "male",
    age: 19,
  };

  ReactDOM.render(
    <Person name="Vue" sex="male" age={11} speak={speak} />,
    document.getElementById("test")
  );

  function speak() {
    console.log("speaking...");
  }
</script>
```

### props 的简写形式

`Person.propTypes` 和 `Person.defaultProps` 可以看作在类身上添加属性，利用 `static` 关键词就能在类内部进行声明。因此所谓简写只是从类外部移到类内部。

```html
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
  class Person extends React.Component {
    static propTypes = {
      name: PropTypes.string.isRequired,
      sex: PropTypes.string,
      age: PropTypes.number,
      // 限制 speak 为函数
      speak: PropTypes.func,
    };
    static defaultProps = {
      sex: "male",
      age: 19,
    };

    render() {
      const { name, age, sex } = this.props;
      return (
        <ul>
          <li>姓名：{name}</li>
          <li>性别：{sex}</li>
          <li>年龄：{age}</li>
        </ul>
      );
    }
  }

  ReactDOM.render(
    <Person name="Vue" sex="male" age={11} speak={speak} />,
    document.getElementById("test")
  );

  function speak() {
    console.log("speaking...");
  }
</script>
```

### 类式组件的构造器与 props

[官网文档说明](https://zh-hans.reactjs.org/docs/react-component.html#constructor)

构造函数一般用在两种情况：

- 通过给 `this.state` 赋值对象来初始化内部 `state`
- 为事件处理函数绑定实例

```js
constructor(props) {
  super(props)
  // 初始化 state
  this.state = { isHot: true, wind: '微风' }
  // 解决 this 指向问题
  this.changeWeather = this.changeWeather.bind(this)
}
```

因此构造器一般都不需要写。如果要在构造器内使用 `this.props` 才声明构造器，并且需要在最开始调用 `super(props)` ：

```js
constructor(props) {
  super(props)
  console.log(this.props)
}
```

### 函数式组件使用 props

由于函数可以传递参数，因此函数式组件可以使用 `props` 。

```html
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
  function Person(props) {
    const { name, age, sex } = props;
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    );
  }
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number,
  };

  Person.defaultProps = {
    sex: "男",
    age: 18,
  };

  ReactDOM.render(<Person name="jerry" />, document.getElementById("test"));
</script>
```

## 组件实例核心属性 refs

通过定义 `ref` 属性可以给标签添加标识。

### 字符串形式的 ref

这种形式已过时，效率不高，[官方](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs)不建议使用。

```html
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      const { input1 } = this.refs;
      alert(input1.value);
    };
    render() {
      return (
        <div>
          <input ref="input1" type="text" placeholder="点击按钮提示数据" />
          &nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        </div>
      );
    }
  }

  ReactDOM.render(<Demo />, document.getElementById("test"));
</script>
```

### 回调形式的 ref

要点：

- `c => this.input1 = c` 就是给组件实例添加 `input1` 属性，值为节点
- 由于是箭头函数，因此 `this` 是 `render` 函数里的 `this` ，即组件实例

```html
<script type="text/babel">
  class Demo extends React.Component {
    showData = () => {
      const { input1 } = this;
      alert(input1.value);
    };
    render() {
      return (
        <div>
          <input
            ref={(c) => {
              this.input1 = c;
            }}
            type="text"
            placeholder="点击按钮提示数据"
          />
          &nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        </div>
      );
    }
  }

  ReactDOM.render(<Demo />, document.getElementById("test"));
</script>
```

关于回调 `ref` 执行次数的问题，[官网](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#caveats-with-callback-refs)描述：

TIP

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 `ref` 并且设置新的。通过将 `ref` 的回调函数定义成 `class` 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

即内联函数形式，在更新过程中 `ref` 回调会被执行两次，第一次传入 `null` ，第二次传入 DOM 元素。若是下述形式，则只执行一次。但是对功能实现没有影响，因此一般也是用内联函数形式。

```html
<script type="text/babel">
  //创建组件
  class Demo extends React.Component {
    state = { isHot: false };

    changeWeather = () => {
      const { isHot } = this.state;
      this.setState({ isHot: !isHot });
    };

    saveInput = (c) => {
      this.input1 = c;
      console.log("@", c);
    };

    render() {
      const { isHot } = this.state;
      return (
        <div>
          <h2>今天天气很{isHot ? "炎热" : "凉爽"}</h2>
          <input ref={this.saveInput} type="text" />
        </div>
      );
    }
  }

  ReactDOM.render(<Demo />, document.getElementById("test"));
</script>
```

### createRef API

该方式通过调用 `React.createRef` 返回一个容器用于存储节点，且一个容器只能存储一个节点。

```html
<script type="text/babel">
  class Demo extends React.Component {
    myRef = React.createRef();
    myRef2 = React.createRef();

    showData = () => {
      alert(this.myRef.current.value);
    };

    showData2 = () => {
      alert(this.myRef2.current.value);
    };
    render() {
      return (
        <div>
          <input ref={this.myRef} type="text" placeholder="点击按钮提示数据" />
          &nbsp;
          <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
          <input
            onBlur={this.showData2}
            ref={this.myRef2}
            type="text"
            placeholder="失去焦点提示数据"
          />
          &nbsp;
        </div>
      );
    }
  }

  ReactDOM.render(<Demo />, document.getElementById("test"));
</script>
```

### 事件处理

- React 使用自定义事件，而非原生 DOM 事件，即 `onClick、onBlur` ：为了更好的兼容性
- React 的事件通过事件委托方式进行处理：为了高效
- 通过 `event.target` 可获取触发事件的 DOM 元素：勿过度使用 `ref`

当触发事件的元素和需要操作的元素为同一个时，可以不使用 `ref` ：

```js
class Demo extends React.Component {
  showData2 = (event) => {
    alert(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          onBlur={this.showData2}
          type="text"
          placeholder="失去焦点提示数据"
        />
        &nbsp;
      </div>
    );
  }
}
```

## 受控 & 非受控组件

包含表单的组件分类：

- 非受控组件：现用现取。即需要使用时，再获取节点得到数据
- 受控组件：类似于 Vue 双向绑定的从视图层绑定到数据层

尽量使用受控组件，因为非受控组件需要使用大量的 `ref` 。

```js
// 非受控组件
class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this;
    alert(`用户名是：${username.value}, 密码是：${password.value}`);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input ref={(c) => (this.username = c)} type="text" name="username" />
        密码：
        <input
          ref={(c) => (this.password = c)}
          type="password"
          name="password"
        />
        <button>登录</button>
      </form>
    );
  }
}
```

```js
// 受控组件
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  saveUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  savePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    alert(`用户名是：${username}, 密码是：${password}`);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input onChange={this.saveUsername} type="text" name="username" />
        密码：
        <input onChange={this.savePassword} type="password" name="password" />
        <button>登录</button>
      </form>
    );
  }
}
```

对上述受控组件的代码进行优化，希望把 `saveUsername` 和 `savePassword` 合并为一个函数。

要点：

- 高阶函数：参数为函数或者返回一个函数的函数，如 `Promise、setTimeout、Array.map()`
- 函数柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

```js
// 函数柯里化
function sum(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}
```

```js
// 使用高阶函数和柯里化写法
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    alert(`用户名是：${username}, 密码是：${password}`);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input
          onChange={this.saveFormData("username")}
          type="text"
          name="username"
        />
        密码：
        <input
          onChange={this.saveFormData("password")}
          type="password"
          name="password"
        />
        <button>登录</button>
      </form>
    );
  }
}
```

```js
// 不使用柯里化写法
class Login extends React.Component {
  state = {
    username: "",
    password: "",
  };

  saveFormData = (dataType, event) => {
    this.setState({ [dataType]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    alert(`用户名是：${username}, 密码是：${password}`);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input
          onChange={(event) => this.saveFormData("username", event)}
          type="text"
          name="username"
        />
        密码：
        <input
          onChange={(event) => this.saveFormData("password", event)}
          type="password"
          name="password"
        />
        <button>登录</button>
      </form>
    );
  }
}
```
