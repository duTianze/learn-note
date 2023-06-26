# React 简介

**react 是什么？**

React 用于构建用户界面的 JS 库。是一个将数据渲染为 HTML 视图的开源 JS 库。

**为什么学？**

1.原生 JS 操作 DOM 繁琐，效率低

2.使用 JS 直接操作 DOM,浏览器会进行大量的重绘重排

3.原生 JS 没有组件化编码方案，代码复用低

> 在学习之前最好看一下关于 npm 的知识：下面是我在网上看见的一个写的还不错的 npm 的文章
>
> [npm](https://blog.csdn.net/qq_25502269/article/details/79346545)

# React 入门

## React 基础案例

1.先倒入三个包：

【先引入 react.development.js，后引入 react-dom.development.js】

```batchfile
react.development.js
react-dom.development.js
babel.min.js
```

2.创建一个容器

3.创建虚拟 DOM，渲染到容器中

```html
<body>
    <!-- 准备好容器 -->
    <div id="test">

    </div>
</body>
<!-- 引入依赖 ,引入的时候，必须就按照这个步骤-->
<script src="../js/react.development.js" type="text/javascript"></script>
<script src="../js/react-dom.development.js" type="text/javascript"></script>

<script src="../js/babel.min.js" type="text/javascript"></script>

<!--这里使用了babel用来解析jsx语法-->
<script type="text/babel">
        // 1.创建虚拟DOM
        const VDOM = <h1>Hello</h1>  //这个地方使用的是JSX语法，不需要加""
        // 2.渲染，如果有多个渲染同一个容器，后面的会将前面的覆盖掉
        ReactDOM.render(VDOM,document.getElementById("test"));
</script>
</html>
```

这样，就会在页面中的这个 div 容器上添加这个 h1.

## JSX 基础语法

1.定义虚拟 DOM，不能使用“”

2.标签中混入 JS 表达式的时候使用{}

3.样式的类名指定不要使用 class，使用 className

4.内敛样式要使用双大括号包裹

5.不能有多个根标签，只能有一个跟标签

6.标签必须闭合

7.如果小写字母开头，就将标签转化为 html 同名元素，如果 html 中无该标签对应的元素，就报错；如果是大写字母开头，react 就去渲染对应的组件，如果没有就报错

> 关于 JS 表达式和 JS 语句：
>
> JS 表达式：返回一个值，可以放在任何一个需要值的地方 a a+b demo(a) arr.map() function text(){} JS 语句：if(){} for(){} while(){} swith(){} 不会返回一个值

实例如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .sss {
        color: red;
      }
    </style>
  </head>
  <body>
    <!-- 准备好容器 -->
    <div id="test"></div>
  </body>
  <!-- 引入依赖 ,引入的时候，必须就按照这个步骤-->
  <script src="../js/react.development.js" type="text/javascript"></script>
  <script src="../js/react-dom.development.js" type="text/javascript"></script>

  <script src="../js/babel.min.js"></script>
  <!--这里使用了js来创建虚拟DOM-->
  <script type="text/babel">
    const MyId = "title";
    const MyData = "Cyk";
    // 1.创建虚拟DOM
    const VDOM = (
      <h1 id={MyId.toLocaleUpperCase()}>
        <span className="sss" style={{ fontSize: "50px" }}>
          sss
        </span>
      </h1>
    );
    // 2.渲染，如果有多个渲染同一个容器，后面的会将前面的覆盖掉
    ReactDOM.render(VDOM, document.getElementById("test"));
  </script>
</html>
```

## 两种创建虚拟 DOM 的方式

**1.使用 JSX 创建虚拟 DOM**

```js
const VDOM = (
  <h1 id={MyId.toLocaleUpperCase()}>
    <span className="sss" style={{ fontSize: "50px" }}>
      sss
    </span>
  </h1>
);
```

这个在上面的案例中已经演示过了 ，下面看看另外一种创建虚拟 DOM 的方式

**2.使用 JS 创建虚拟 DOM**

```js
// 1.创建虚拟DOM[在这使用了js的语法]React.createElement(标签,标签属性,内容)
const VDOM = React.createElement("h1", { id: "title" }, "nihao");
```

使用 JS 和 JSX 都可以创建虚拟 DOM，但是可以看出 JS 创建虚拟 DOM 比较繁琐，尤其是标签如果很多的情况下，所以还是比较推荐使用 JSX 来创建。

# 组件

当应用是以多组件的方式实现，这个应用就是一个组件化的应用

> **注意：** 组件名称必须以大写字母开头。
>
> React 会将以小写字母开头的组件视为原生 DOM 标签。例如，< div />`代表 HTML 的 div 标签，而`< Weclome /> 则代表一个组件，并且需在作用域内使用 `Welcome`
>
> 传递的参数，不能在组件中改动

## 函数式组件

```
//1.先创建函数，函数可以有参数，也可以没有，但是必须要有返回值 返回一个虚拟DOM
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//2.进行渲染
ReactDOM.Render(<Welcom name = "ss" />,document.getElementById("div"));
```

让我们来回顾一下这个例子中发生了什么：

1. 我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" />` 作为参数。
2. React 调用 `Welcome` 组件，并将 `{name: 'Sara'}` 作为 props 传入。
3. `Welcome` 组件将 `Hello, Sara` 元素作为返回值。
4. React DOM 将 DOM 高效地更新为 `Hello, Sara`。

## Class 组件

```
//必须继承React.Component
//然后重写Render()方法，该方法一定要有返回值，返回一个虚拟DOM
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
//渲染 【这个跟之前也是一样的】
ReactDOM.Render(<Welcom name = "ss" />,document.getElementById("div"));
```

执行过程：

​ 1.React 解析组件标签，找到相应的组件

​ 2.发现组件是类定义的，随后 new 出来的类的实例，并通过该实例调用到原型上的 render 方法

​ 3.将 render 返回的虚拟 DOM 转化为真实的 DOM,随后呈现在页面中

## 组件案例

下面，我们通过一个案例更好的理解组件：【只关注与核心代码】

我们发现组件是可以包含中使用的， 而且如果创建的数组，必须要代一个 key。数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值

```
<script type="text/babel">

        //创建一个组件<li>
        function GetLi(props){
            return <li>{props.value}</li>
        };

        // 1.创建类式组件<ul>
        class MyComponent extends React.Component{
            render(){
                console.log(this.props.arr);
                let com = this.props.arr.map((item,index)=>
                     //在这个地方包含了GetLi这个组件，【注意不能用{}】
                     //因为这个是一个列表，所以必须传递一个key【独一无二的Key】
                     //key 帮助 React 识别哪些元素改变了，比如被添加或删除。
                        <GetLi value={item} key = {index} />
                    );
                console.log(com);
                return <ul>{com}</ul>
            }
        }

        let num = [1,2,3,4]
        //2.渲染组件
        ReactDOM.render(<MyComponent  arr={num}/>,document.getElementById("test");
</script>
```
