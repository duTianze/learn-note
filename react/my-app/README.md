## TodoList 案例总结

1. 拆分组件、实现静态组件，注意：`className` 、`style` 的写法
2. 动态初始化列表，如何确定将数据放在哪个组件的 `state` 中？

-   某个组件使用：放在其自身的 `state` 中
-   某些组件使用：放在他们共同的父组件 `state` 中，即**状态提升**

3. 关于父子之间通信：

-   父传子：直接通过 `props` 传递
-   子传父：父组件通过 `props` 给子组件传递一个函数，子组件调用该函数

4. 注意 `defaultChecked` 和 `checked` 的区别，类似的还有：`defaultValue` 和 `value`
5. 状态在哪里，操作状态的方法就在哪里

# React 网络请求

## React 脚手架配置代理

方法一：

在 `package.json` 文件中进行配置：

```js
"proxy": "http://localhost:5000"
```

-   优点：配置简单，前端请求资源可不加前缀
-   缺点：不能配置多个代理
-   工作方式：当请求了 3000 端口号（本机）不存在的资源时，就会把请求转发给 5000 端口号服务器

方法二：

在 `src` 目录下创建代理配置文件 `setupProxy.js` ，进行配置：

```js
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
        proxy("/api1", {
            //配置转发目标地址(能返回数据的服务器地址)
            target: "http://localhost:5000",
            //控制服务器接收到的请求头中host字段的值
            /*
      changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
      changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
      changeOrigin默认值为false，但一般将changeOrigin改为true
      */
            changeOrigin: true,

            //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
            pathRewrite: { "^/api1": "" },
        }),
        proxy("/api2", {
            target: "http://localhost:5001",
            changeOrigin: true,
            pathRewrite: { "^/api2": "" },
        })
    );
};
```

## 消息订阅-发布机制

即 React 中兄弟组件或任意组件之间的通信方式。

使用的工具库：[PubSubJS](https://www.npmjs.com/package/pubsub-js)

下载安装 `PubSubJS` ：`npm install pubsub-js --save`

基础用法：

```js
import PubSub from "pubsub-js";

// 订阅消息
var token = PubSub.subscribe("topic", (msg, data) => {
    console.log(msg, data);
});

// 发布消息
PubSub.publish("topic", "hello react");

// 取消订阅
PubSub.unsubscribe(token);
```

## Github 搜索框案例知识点总结

1. 设计状态时要考虑全面，例如带有网络请求的组件，要考虑请求失败怎么办。
2. ES6 知识点：解构赋值 + 重命名

```js
let obj = { a: { b: 1 } };

//传统解构赋值
const { a } = obj;

//连续解构赋值
const {
    a: { b },
} = obj;

//连续解构赋值 + 重命名
const {
    a: { b: value },
} = obj;
```

3. 消息订阅与发布机制

-   先订阅，再发布（隔空对话）
-   适用于任意组件间通信
-   要在 `componentWillUnmount` 钩子中取消订阅

4. `fetch` 发送请求（**关注分离**的设计思想）

```js
try {
    // 先看服务器是否联系得上
    const response = await fetch(`/api1/search/users2?q=${keyWord}`);
    // 再获取数据
    const data = await response.json();
    console.log(data);
} catch (error) {
    console.log("请求出错", error);
}
```

## 三、路由的基本使用

```
		1.明确好界面中的导航区、展示区
		2.导航区的a标签改为Link标签
					<Link to="/xxxxx">Demo</Link>
		3.展示区写Route标签进行路径的匹配
					<Route path='/xxxx' component={Demo}/>
		4.<App>的最外侧包裹了一个<BrowserRouter>或<HashRouter>
```

## 四、路由组件与一般组件

```
1.写法不同：
    一般组件：<Demo/>
    路由组件：<Route path="/demo" component={Demo}/>
2.存放位置不同：
    一般组件：components
    路由组件：pages
3.接收到的props不同：
    一般组件：写组件标签时传递了什么，就能收到什么
    路由组件：接收到三个固定的属性
        history:
            go: ƒ go(n)
            goBack: ƒ goBack()
            goForward: ƒ goForward()
            push: ƒ push(path, state)
            replace: ƒ replace(path, state)
        location:
            pathname: "/about"
            search: ""
            state: undefined
        match:
            params: {}
            path: "/about"
            url: "/about"
```

## 五、NavLink 与封装 NavLink

```
1.NavLink可以实现路由链接的高亮，通过activeClassName指定样式名
```

## 六、Switch 的使用

```
1.通常情况下，path和component是一一对应的关系。
2.Switch可以提高路由匹配效率(单一匹配)。
```

## 七、解决多级路径刷新页面样式丢失的问题

```
1.public/index.html 中 引入样式时不写 ./ 写 / （常用）
2.public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
3.使用HashRouter
```

## 八、路由的严格匹配与模糊匹配

```
1.默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
2.开启严格匹配：<Route exact={true} path="/about" component={About}/>
3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由
```

## 九、Redirect 的使用

```
1.一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由
2.具体编码：
    <Switch>
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
        <Redirect to="/about"/>
    </Switch>
```

## 十、嵌套路由

```
1.注册子路由时要写上父路由的path值
2.路由的匹配是按照注册路由的顺序进行的
```

## 十一、向路由组件传递参数

```
1.params参数
    路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
    注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
    接收参数：this.props.match.params
2.search参数
    路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
    注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
    接收参数：this.props.location.search
    备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
3.state参数
    路由链接(携带参数)：<Link to={{pathname:'/demo/test',state:{name:'tom',age:18}}}>详情</Link>
    注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
    接收参数：this.props.location.state
    备注：刷新也可以保留住参数
```

## 十二、编程式路由导航

```
借助this.prosp.history对象上的API对操作路由跳转、前进、后退
    - this.prosp.history.push()
    - this.prosp.history.replace()
    - this.prosp.history.goBack()
    - this.prosp.history.goForward()
    - this.prosp.history.go()
```

## 十三、BrowserRouter 与 HashRouter 的区别

```
1.底层原理不一样：
    BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。
    HashRouter使用的是URL的哈希值。
2.path表现形式不一样
    BrowserRouter的路径中没有#,例如：localhost:3000/demo/test
    HashRouter的路径包含#,例如：localhost:3000/#/demo/test
3.刷新后对路由state参数的影响
    (1).BrowserRouter没有任何影响，因为state保存在history对象中。
    (2).HashRouter刷新后会导致路由state参数的丢失！！！
4.备注：HashRouter可以用于解决一些路径错误相关的问题。
```

## 十四、antd 的按需引入+自定主题

```
1.安装依赖：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
2.修改package.json
    ....
        "scripts": {
            "start": "react-app-rewired start",
            "build": "react-app-rewired build",
            "test": "react-app-rewired test",
            "eject": "react-scripts eject"
        },
    ....
3.根目录下创建config-overrides.js
    //配置具体的修改规则
    const { override, fixBabelImports,addLessLoader} = require('customize-cra');
    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            lessOptions:{
                javascriptEnabled: true,
                modifyVars: { '@primary-color': 'green' },
            }
        }),
    );
4.备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉
```

# React 扩展

## 1. setState

### setState 更新状态的 2 种写法

```js
    (1). setState(stateChange, [callback])------对象式的setState
            1.stateChange为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用

    (2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。

总结: 1.对象式的 setState 是函数式的 setState 的简写方式(语法糖) 2.使用原则：
(1).如果新状态不依赖于原状态 ===> 使用对象方式
(2).如果新状态依赖于原状态 ===> 使用函数方式
(3).如果需要在 setState()执行后获取最新的状态数据,要在第二个 callback 函数中读取
```

---

## 2. lazyLoad

### 路由组件的 lazyLoad

```js
	//1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包
	const Login = lazy(()=>import('@/pages/Login'))

	//2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面
	<Suspense fallback={<h1>loading.....</h1>}>
        <Switch>
            <Route path="/xxx" component={Xxxx}/>
            <Redirect to="/login"/>
        </Switch>
    </Suspense>
```

---

## 3. Hooks

#### 1. React Hook/Hooks 是什么?

```js
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

#### 2. 三个常用的 Hook

```js
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

#### 3. State Hook

```js
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

#### 4. Effect Hook

```js
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明:
        useEffect(() => {
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行

(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount()
```

#### 5. Ref Hook

```js
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```

---

## 4. Fragment

### 使用

```js
<Fragment><Fragment>
<></>
```

### 作用

> 可以不用必须有一个真实的 DOM 根标签了
