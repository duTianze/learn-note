## 具体步骤

1. 如果下载缓慢请配置 npm 淘宝镜像 npm config set registry http://registry.npm.taobao.org
2. 全局安装 @vue/cli npm install -g @vue/cli
3. 切换到创建项目的目录，使用命令创建项目 vue create xxx
4. 选择使用 vue 的版本
5. 启动项目 npm run serve
6. 打包项目 npm run build
7. 暂停项目 Ctrl+C

> Vue 脚手架隐藏了所有 webpack 相关的配置，若想查看具体的 webpack 配置，请执行
> vue inspect > output.js

## 脚手架文件结构

.文件目录
├── node_modules
├── public
│ ├── favicon.ico: 页签图标
│ └── index.html: 主页面
├── src
│ ├── assets: 存放静态资源
│ │ └── logo.png
│ │── component: 存放组件
│ │ └── HelloWorld.vue
│ │── App.vue: 汇总所有组件
│ └── main.js: 入口文件
├── .gitignore: git 版本管制忽略的配置
├── babel.config.js: babel 的配置文件
├── package.json: 应用包配置文件
├── README.md: 应用描述文件
└── package-lock.json: 包版本控制文件

## 不同版本 vue 说明

1. vue.js 与 vue.runtime.xxx.js 的区别
   a. vue.js 是完整版的 Vue，包含：核心功能+模板解析器
   b. vue.runtime.xxx.js 是运行版的 Vue，只包含核心功能，没有模板解析器, esm 就是 ES6 module
2. 因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用 render 函数接收到的 createElement 函数去指定具体内容

## 配置文件

vue inspect > output.js 可以查看到 Vue 脚手架的默认配置
使用 vue.config.js 可以对脚手架进行个性化定制，和 package.json 同级目录，
详见 配置参考 | Vue CLI https://cli.vuejs.org/zh/config/#vue-config-js

## ref 属性

ref 被用来给元素或子组件注册引用信息（id 的替代者）

- 应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上获取的是组件实例对象 vc
- 使用方式
  1. 打标识：`<h1 ref="xxx"></h1>或<School ref="xxx"></School>`
  2. 获取：this.$refs.xxx

## props 配置项

props 让组件接收外部传过来的数据

- 传递数据`<Demo name="xxx" :age="18"/>`这里 age 前加`:`，通过 v-bind 使得里面的 18 是数字
- 接收数据
  第一种方式（只接收）`props:['name', 'age']`
  第二种方式（限制类型）`props:{name:String, age:Number}`
  第三种方式（限制类型、限制必要性、指定默认值）
  ```javascript
  props: {
     name: {
        type: String,	 // 类型
        required: true,  // 必要性
        default: 'dtz'   // 默认值
     }
  }
  ```

备注：`props 是只读的`，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中，然后去修改 data 中的数据

## mixin 混入

1. 功能：可以把多个组件共用的配置提取成一个混入对象
2. 使用方式
   a. 定义混入
   ```javascript
   const mixin = {
    data() {....},
    methods: {....}
    ....
   }
   ```
   b. 使用混入
   - 全局混入`Vue.mixin(xxx)`
   - 局部混入`mixins:['xxx']`
3. 备注

   1. 组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”，在发生冲突时以组件优先

   ```javascript
   var mixin = {
     data: function () {
       return {
         message: "hello",
         name: "dtz",
       };
     },
   };
   new Vue({
     mixins: [mixin],
     data() {
       return {
         message: "goodbye",
         address: "北京",
       };
     },
     created() {
       console.log(this.$data);
       // => { message: "goodbye", name: "dtz", address: "北京" }
     },
   });
   ```

4. 同名生命周期钩子将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用

```javascript
var mixin = {
  created() {
    console.log("混入对象的钩子被调用");
  },
};

new Vue({
  mixins: [mixin],
  created() {
    console.log("组件钩子被调用");
  },
});

// => "混入对象的钩子被调用"
// => "组件钩子被调用"
```

## plugin 插件

1. 功能：用于增强 Vue
2. 本质：包含 install 方法的一个对象，install 的第一个参数是 Vue，第二个以后的参数是插件使用者传递的数据
3. 定义插件（见下 `src/plugin.js`）
4. 使用插件：`Vue.use()`

## scoped 样式

1. 作用：让样式在局部生效，防止冲突
2. 写法：`<style scoped>`
   Vue 中的 webpack 并没有安装最新版，导致有些插件也不能默认安装最新版，
   如 `npm i less-loader@7`，而不是最新版

> 查看版本`npm view vue versions`

## 总结 TodoList 案例

1. 组件化编码流程:
   1. 拆分静态组件:组件要按照功能点拆分，命名不要与 html 元素冲突。
   2. 实现动态组件:考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用:
      1. 一个组件在用:放在组件自身即可。
      2. 一些组件在用:放在他们共同的父组件上(状态提升)。
   3. 实现交互:从绑定事件开始。
2. props 适用于:
   1. 父组件==>子组件通信
   2. 子组件==>父组件通信(要求父先给子一个函数)
3. 使用 v-model 时要切记: v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的!
4. props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但不推荐这样做。

## WebStorage（js 本地存储）

1. 存储内容大小一般支持 5MB 左右（不同浏览器可能还不一样）
2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制
3. 相关 API
   1. xxxStorage.setItem('key', 'value')该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值
   2. xxxStorage.getItem('key')该方法接受一个键名作为参数，返回键名对应的值
   3. xxxStorage.removeItem('key')该方法接受一个键名作为参数，并把该键名从存储中删除
   4. xxxStorage.clear()该方法会清空存储中的所有数据
4. 备注
   1. SessionStorage 存储的内容会随着浏览器窗口关闭而消失
   2. LocalStorage 存储的内容，需要手动清除才会消失
   3. xxxStorage.getItem(xxx)如果 xxx 对应的 value 获取不到，那么 getItem()的返回值是 null
   4. JSON.parse(null)的结果依然是 null

## 组件的自定义事件

1. 一种组件间通信的方式，适用于：`子组件 ===> 父组件`
2. 使用场景：子组件想给父组件传数据，那么就要在父组件中给子组件绑定自定义事件（事件的回调在 A 中）
3. 绑定自定义事件
   1. 第一种方式，在父组件中 `<Demo @事件名="方法"/>或<Demo v-on:事件名="方法"/>`
   2. 第二种方式，在父组件中 `this.$refs.demo.$on('事件名',方法)`
   ```javascript
   <Demo ref="demo"/>
   ......
   mounted(){
     this.$refs.demo.$on('atguigu',this.test)
   }
   ```
   3. 若想让自定义事件只能触发一次，可以使用 `once` 修饰符，或 `$once` 方法
4. 触发自定义事件 `this.$emit` ('事件名',数据)
5. 解绑自定义事件 `this.$off` ('事件名')
6. 组件上也可以绑定原生 DOM 事件，需要使用 native 修饰符 `@click.native="show"`
   上面绑定自定义事件，即使绑定的是原生事件也会被认为是自定义的，需要加 native，加了后就将此事件给组件的根元素
7. 注意：通过 `this.$refs.xxx.$on` ('事件名',回调函数)绑定自定义事件时，回调函数要么配置在 `methods` 中，要么用箭头函数，否则 this 指向会出问题

## 全局事件总线（GlobalEventBus）

一种可以在任意组件间通信的方式，本质上就是一个对象，它必须满足以下条件

1. 所有的组件对象都必须能看见他
2. 这个对象必须能够使用$on$emit$off 方法去绑定、触发和解绑事件

使用步骤

1. 定义全局事件总线

   ```javascript
   new Vue({
       ...
       beforeCreate() {
         Vue.prototype.$bus = this // 安装全局事件总线，$bus 就是当前应用的 vm
       },
       ...
   })
   ```

2. 使用事件总线

a.接收数据：
A 组件想接收数据，则在 A 组件中给$bus 绑定自定义事件，事件的回调留在 A 组件自身

```javascript
export default {
    methods(){
        demo(data){...}
    }
    ...
    mounted() {
        this.$bus.$on('xxx',this.demo)
    }
}
```

b. 提供数据：this.$bus.$emit('xxx',data)

3. 最好在 beforeDestroy 钩子中，用$off()去解绑当前组件所用到的事件

## 消息的订阅与发布（基本不用）

消息订阅与发布（pubsub）消息订阅与发布是一种组件间通信的方式，适用于任意组件间通信  
使用步骤

1. 安装 pubsub：npm i pubsub-js
2. 引入：import pubsub from 'pubsub-js'
3. 接收数据：A 组件想接收数据，则在 A 组件中订阅消息，订阅的回调留在 A 组件自身  
   ​

```
export default {
    methods: {
        demo(msgName, data) {...}
    }
    ...
    mounted() {
			this.pid = pubsub.subscribe('xxx',this.demo)
    }
}
```

4. 提供数据：pubsub.publish('xxx',data)
5. 最好在 beforeDestroy 钩子中，使用 pubsub.unsubscribe(pid)取消订阅

## $nextTick

这是一个生命周期钩子
this.$nextTick(回调函数)在下一次 DOM 更新结束后执行其指定的回调
什么时候用：当改变数据后，要基于更新后的新 DOM 进行某些操作时，要在 nextTick 所指定的回调函数中执行

## 过渡与动画

Vue 封装的过度与动画：在插入、更新或移除 DOM 元素时，在合适的时候给元素添加样式类名
写法

1. 准备好样式

- 元素进入的样式
  - `v-enter`进入的起点
  - `v-enter-active`进入过程中
  - `v-enter-to`进入的终点
- 元素离开的样式
  - `v-leave`离开的起点
  - `v-leave-active`离开过程中
  - `v-leave-to`离开的终点

2.  使用`<transition>`包裹要过度的元素，并配置`name`属性，此时需要将上面样式名的 v 换为 name
3.  要让页面一开始就显示动画，需要添加`appear`

```javascript
<transition name="hello" appear>
  <h1 v-show="isShow">你好啊！</h1>
</transition>

<style>
  .hello-enter-active{
    animation: hello 0.5s linear;
  }

  .hello-leave-active{
    animation: hello 0.5s linear reverse;
  }

  @keyframes hello {
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
</style>
```

4. 备注：若有多个元素需要过度，则需要使用`<transition-group>`，且每个元素都要指定 `key` 值

```javascript
<transition-group name="hello" appear>
  <h1 v-show="!isShow" key="1">
    你好啊！
  </h1>
  <h1 v-show="isShow" key="2">
    尚硅谷！
  </h1>
</transition-group>
```

5. 第三方动画库 `Animate.css`

安装第三方库：
`npm i animate.css`

使用：直接引用就可以  
`import 'animate.css'`

```javascript
<transition-group
  appear
  name="animate__animated animate__bounce"
  enter-active-class="animate__swing"
  leave-active-class="animate__backOutUp"
>
  <h1 v-show="!isShow" key="1">
    你好啊！
  </h1>
  <h1 v-show="isShow" key="2">
    尚硅谷！
  </h1>
</transition-group>
```

# Vue 脚手架配置代理

本案例需要下载 axios 库`npm install axios`
配置参考文档 Vue-Cli devServer.proxy
`vue.config.js` 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。你也可以使用 `package.json` 中的 vue 字段，但是注意这种写法需要你严格遵照 JSON 的格式来写

## 方法一

在`vue.config.js`中添加如下配置

```javascript
module.exports = {
  devServer: {
    proxy: "http://localhost:5000",
  },
};
```

说明

1. 优点：配置简单，请求资源时直接发给前端（8080）即可
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，才会将请求会转发给服务器 （优先匹配前端资源）

## 方法二

编写`vue.config.js`配置具体代理规则

```javascript
module.exports = {
  devServer: {
    proxy: {
      "/api1": {
        // 匹配所有以 '/api1'开头的请求路径
        target: "http://localhost:5000", // 代理目标的基础路径
        pathRewrite: { "^/api1": "" }, // 代理往后端服务器的请求去掉 /api1 前缀
        ws: true, // WebSocket
        changeOrigin: true,
      },
      "/api2": {
        target: "http://localhost:5001",
        pathRewrite: { "^/api2": "" },
        changeOrigin: true,
      },
    },
  },
};
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理
2. 缺点：配置略微繁琐，请求资源时必须加前缀

# slot 插槽

`<slot>`插槽：让父组件可以向子组件指定位置插入 html 结构，也是一种组件间通信的方式，
适用于 父组件 ===> 子组件

1. 分类：默认插槽、具名插槽、作用域插槽
2. 使用方式
   a. 默认插槽

   ```javascript
   父组件中：
        <Category>
           <div>html结构1</div>
        </Category>
   子组件中：Category
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot>插槽默认内容...</slot>
            </div>
        </template>
   ```

   b. 具名插槽
   父组件指明放入子组件的哪个插槽 `slot="footer"`，如果是 `template` 可以写成 `v-slot:footer`

   ```javascript
   父组件中：
        <Category>
            <template slot="center">
              <div>html结构1</div>
            </template>

            <template v-slot:footer>
               <div>html结构2</div>
            </template>
        </Category>
   子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot name="center">插槽默认内容...</slot>
               <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>
   ```

   c. 作用域插槽
   `scope` 用于父组件往子组件插槽放的 html 结构接收子组件的数据
   理解：`数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定`
   （games 数据在 Category 组件中，但使用数据所遍历出来的结构由 App 组件决定）

   ```javascript
   父组件中：
        <Category>
            <template scope="scopeData">
                <!-- 生成的是ul列表 -->
                <ul>
                  <li v-for="g in scopeData.games" :key="g">{{g}}</li>
                </ul>
            </template>
        </Category>

        <Category>
            <template slot-scope="scopeData">
                <!-- 生成的是h4标题 -->
                <h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
            </template>
        </Category>
   子组件中：
        <template>
            <div>
                <slot :games="games"></slot>
            </div>
        </template>

        <script>
            export default {
                name:'Category',
                props:['title'],
                //数据在子组件自身
                data() {
                    return {
                        games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                    }
                },
            }
        </script>
   ```

   注意：关于样式，既可以写在父组件中，解析后放入子组件插槽；也可以放在子组件中，传给子组件再解析

# Vuex

## 理解 Vuex

Vuex 是什么

1. 概念：专门在 Vue 中实现集中式状态（数据）管理的一个 Vue 插件，对 Vue 应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信
2. 什么时候使用 Vuex
   1. 多个组件依赖于同一状态
   2. 来自不同组件的行为需要变更同一状态

## 搭建 Vuex 环境

1. 下载安装 vuex `npm i vuex`

```
npm i vuex@3
```

2. 创建`src/store/index.js`该文件用于创建 Vuex 中最为核心的`store`

```javascript
import Vue from "vue";
import Vuex from "vuex"; // 引入Vuex

Vue.use(Vuex); // 应用Vuex插件

const actions = {}; // 准备actions——用于响应组件中的动作
const mutations = {}; // 准备mutations——用于操作数据（state）
const state = {}; // 准备state——用于存储数据

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
});
```

3. 在`src/main.js`中创建 `vm` 时传入 `store` 配置项

```javascript
import Vue from "vue";
import App from "./App.vue";
import store from "./store"; // 引入store

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  render: (h) => h(App),
  store, // 配置项添加store
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
});
```

## 使用 Vuex 编写

Vuex 的基本使用

1. 初始化数据 state，配置`actions`、`mutations`，操作文件 `store.js`
2. 组件中读取 vuex 中的数据`$store.state.数据`
3. 组件中修改 vuex 中的数据`$store.dispatch('action中的方法名',数据)`
   或`$store.commit('mutations 中的方法名',数据)`  
    若没有网络请求或其他业务逻辑，组件中也可越过 actions，即不写 dispatch，直接编写 commit

`src/store/index.js` 该文件用于创建 Vuex 中最为核心的 `store`

## getters 配置项

1. 概念：当 `state` 中的数据需要经过加工后再使用时，可以使用 `getters` 加工，相当于全局计算属性
2. 在 `store.js` 中追加 `getters` 配置

```javascript
......

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

// 创建并暴露store
export default new Vuex.Store({
	......
	getters
})
```

3. 组件中读取数据`$store.getters.bigSum`

## 四个 map 方法的使用

1. `mapState` 方法：用于帮助映射 `state` 中的数据为计算属性

```javascript
computed: {
  	// 借助mapState生成计算属性：sum、school、subject（对象写法一）
  	...mapState({sum:'sum',school:'school',subject:'subject'}),

  	// 借助mapState生成计算属性：sum、school、subject（数组写法二）
  	...mapState(['sum','school','subject']),
},
```

2. `mapGetters`方法：用于帮助映射`getters`中的数据为计算属性

```javascript
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法一）
    ...mapGetters({bigSum:'bigSum'}),

    //借助mapGetters生成计算属性：bigSum（数组写法二）
    ...mapGetters(['bigSum'])
},
```

3. `mapActions`方法：用于帮助生成与`actions`对话的方法，即包含`$store.dispatch(xxx)`的函数

```javascript
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
}
```

4. `mapMutations`方法：用于帮助生成与`mutations`对话的方法，即包含`$store.commit(xxx)`的函数

```javascript
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),

    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```

注意：`mapActions` 与 `mapMutations` 使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象

## 多组件共享数据案例

## 模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确
2. 修改 store.js
   为了解决不同模块命名冲突的问题，将不同模块的 `namespaced: true`，之后在不同页面中引入 `getter` `actions` `mutations` 时，需要加上所属的模块名

```javascript
const countAbout = {
  namespaced: true,	// 开启命名空间
  state: {x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){ return state.sum * 10 }
  }
}

const personAbout = {
  namespaced: true,	// 开启命名空间
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }

```

3. 开启命名空间后，组件中读取`state`数据

```javascript
// 方式一：自己直接读取
this.$store.state.personAbout.list
// 方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```

4. 开启命名空间后，组件中读取`getters`数据

```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```

5. 开启命名空间后，组件中调用 `dispatch`

```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

6. 开启命名空间后，组件中调用`commit`

```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

# Vue Router 相关理解 基本路由 多级路由

## 相关理解

### vue-router 的理解

vue 的一个插件库，专门用来实现 SPA 应用

### 对 SPA 应用的理解

1. 单页 Web 应用（single page web application，SPA）
2. 整个应用`只有一个完整的页面`
3. 点击页面中的导航链接`不会刷新`页面，只会做页面的`局部更新`
4. 数据需要通过 `ajax` 请求获取

### 路由的理解

1. 什么是路由?
   a. 一个路由就是一组映射关系（key - value）
   b. key 为路径，value 可能是 function 或 componen
2. 路由分类
   - 后端路由
     - 理解：value 是 function，用于处理客户端提交的请求
     - 工作过程：服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据
   - 前端路由
     - 理解：value 是 component，用于展示页面内容
     - 工作过程：当浏览器的路径改变时，对应的组件就会显示

## 基本路由

1. 安装 `vue-router`，命令 `npm i vue-router` `npm i vue-router@3`
2. 应用插件 `Vue.use(VueRouter)`
3. 编写 `router` 配置项

```javascript
import VueRouter from "vue-router"; // 引入VueRouter
import About from "../components/About"; // 路由组件
import Home from "../components/Home"; // 路由组件

// 创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
  routes: [
    {
      path: "/about",
      component: About,
    },
    {
      path: "/home",
      component: Home,
    },
  ],
});

//暴露router
export default router;
```

4. 实现切换
   `<router-link></router-link>`浏览器会被替换为 a 标签 active-class 可配置高亮样式
   ```javascript
   <router-link active-class="active" to="/about">
     About
   </router-link>
   ```
5. 指定展示位`<router-view></router-view>`

## 几个注意事项

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹
   比如上一节的案例就可以修改为
   `src/pages/Home.vue`
   src/pages/About.vue`
`src/router/index.js`
`src/components/Banner.vue`
`src/App.vue`
2. 通过切换，`隐藏`了的路由组件，默认是被销毁掉的，需要的时候再去挂载
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息
4. 整个应用只有一个`router`，可以通过组件的`$router`属性获取到

## 多级路由

1. 配置路由规则，使用 children 配置项
2. 跳转（要写完整路径）

```javascript
<router-link to="/home/news">News</router-link>
```

## 路由的 query 参数

1. 传递参数

```javascript
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">跳转</router-link>

<!-- 跳转并携带query参数，to的对象写法（推荐） -->
<router-link
	:to="{
		path:'/home/message/detail',
		query:{
		   id: m.id,
       title: m.title
		}
	}"
>跳转</router-link>
```

2. 接收参数

```javascript
$route.query.id;
$route.query.title;
```

## 命名路由

1. 作用：可以简化路由的跳转
2. 如何使用
   a. 给路由命名

   ```javascript
   {
   	path:'/demo',
   	component:Demo,
   	children:[
   		{
   			path:'test',
   			component:Test,
   			children:[
   				{
          name:'hello' // 给路由命名
   					path:'welcome',
   					component:Hello,
   				}
   			]
   		}
   	]
   }

   ```

   b. 简化跳转

   ```javascript
   <!--简化前，需要写完整的路径 -->
    <router-link to="/demo/test/welcome">跳转</router-link>

    <!--简化后，直接通过名字跳转 -->
    <router-link :to="{name:'hello'}">跳转</router-link>

    <!--简化写法配合传递参数 -->
    <router-link
      :to="{
        name:'hello',
        query:{
            id:666,
            title:'你好'
        }
      }"
    >跳转</router-link>
   ```

## 路由的 params 参数

1. 配置路由，声明接收 params 参数

```javascript
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title', // 🔴使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```

2. 传递参数

特别注意：路由携带 params 参数时，若使用 to 的对象写法，则不能使用 path 配置项，必须使用 name 配置！

```javascript
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>

<!-- 跳转并携带params参数，to的对象写法 -->
<router-link
	:to="{
		name:'xiangqing',
		params:{
		   id:666,
       title:'你好'
		}
	}"
>跳转</router-link>
```

3. 接收参数

```javascript
$route.params.id;
$route.params.title;
```

## 路由的 props 配置

props 作用：让路由组件更方便的收到参数

```javascript
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，为true时，则把路由收到的所有params参数通过props传给Detail组件
	// props:true

	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props($route){
		return {
			id: $route.query.id,
			title: $route.query.title
		}
	}
}
```

## 路由跳转的 replace 方法

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：push 和 replace
   push 是追加历史记录
   replace 是替换当前记录，路由跳转时候默认为 push 方式
3. 开启 replace 模式
   `<router-link :replace="true" ...>News</router-link>`
   简写`<router-link replace ...>News</router-link>`
   总结：浏览记录本质是一个栈，默认 push，点开新页面就会在栈顶追加一个地址，后退，栈顶指针向下移动，改为 replace 就是不追加，而将栈顶地址替换

## 编程式路由导航（不用<router-link>）

作用：不借助<router-link>实现路由跳转，让路由跳转更加灵活

1. this.$router.push({}) 内传的对象与<router-link>中的 to 相同
2. this.$router.replace({})
3. this.$router.forward() 前进
4. this.$router.back() 后退
5. this.$router.go(n) 可前进也可后退，n 为正数前进 n，为负数后退

```javascript
this.$router.push({
  name: "xiangqing",
  params: {
    id: xxx,
    title: xxx,
  },
});

this.$router.replace({
  name: "xiangqing",
  params: {
    id: xxx,
    title: xxx,
  },
});
```

## 缓存路由组件

作用：让不展示的路由组件保持挂载，不被销毁
`<keep-alive include="News"><router-view></router-view></keep-alive>`
`<keep-alive :include="['News', 'Message']"><router-view></router-view></keep-alive>`

```javascript
// 缓存一个路由组件
<keep-alive include="News"> // include中写想要缓存的组件名，不写表示全部缓存
    <router-view></router-view>
</keep-alive>

// 缓存多个路由组件
<keep-alive :include="['News','Message']">
    <router-view></router-view>
</keep-alive>
```

## activated deactivated

activated 和 deactivated 是路由组件所独有的两个钩子，用于捕获路由组件的激活状态
具体使用

1. activated 路由组件被激活时触发
2. deactivated 路由组件失活时触发

```javascript
<template>
    <ul>
        <li :style="{opacity}">欢迎学习vue</li>
        <li>news001 <input type="text"></li>
        <li>news002 <input type="text"></li>
        <li>news003 <input type="text"></li>
    </ul>
</template>

<script>
    export default {
        name:'News',
        data(){
            return{
                opacity:1
            }
        },
        activated(){
            console.log('News组件被激活了')
            this.timer = setInterval(() => {
                this.opacity -= 0.01
                if(this.opacity <= 0) this.opacity = 1
            },16)
        },
        deactivated(){
            console.log('News组件失活了')
            clearInterval(this.timer)
        }
    }
</script>
```

## 路由守卫

作用：对路由进行权限控制
分类：全局守卫、独享守卫、组件内守卫

1. 全局守卫

meta 路由源信息

`src/router/index.js`

```javascript
//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Message from "../pages/Message";
import Detail from "../pages/Detail";

//创建一个路由器
const router = new VueRouter({
  routes: [
    {
      name: "guanyv",
      path: "/about",
      component: About,
      meta: { title: "关于" },
    },
    {
      name: "zhuye",
      path: "/home",
      component: Home,
      meta: { title: "主页" },
      children: [
        {
          name: "xinwen",
          path: "news",
          component: News,
          meta: { isAuth: true, title: "新闻" },
        },
        {
          name: "xiaoxi",
          path: "message",
          component: Message,
          meta: { isAuth: true, title: "消息" },
          children: [
            {
              name: "xiangqing",
              path: "detail",
              component: Detail,
              meta: { isAuth: true, title: "详情" },
              props($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                };
              },
            },
          ],
        },
      ],
    },
  ],
});

// 🔴全局前置路由守卫————初始化的时候、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  console.log("前置路由守卫", to, from);
  if (to.meta.isAuth) {
    if (localStorage.getItem("school") === "atguigu") {
      next();
    } else {
      alert("学校名不对，无权限查看！");
    }
  } else {
    next();
  }
});

// 🔴全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
  console.log("后置路由守卫", to, from);
  document.title = to.meta.title || "硅谷系统";
});

// 导出路由器
export default router;
```

2.  独享守卫

`src/router/index.js`

```javascript
//该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Message from "../pages/Message";
import Detail from "../pages/Detail";

//创建一个路由器
const router = new VueRouter({
  routes: [
    {
      name: "guanyv",
      path: "/about",
      component: About,
      meta: { title: "关于" },
    },
    {
      name: "zhuye",
      path: "/home",
      component: Home,
      meta: { title: "主页" },
      children: [
        {
          name: "xinwen",
          path: "news",
          component: News,
          meta: { title: "新闻" },
          // 🔴独享守卫，特定路由切换之后被调用
          beforeEnter(to, from, next) {
            console.log("独享路由守卫", to, from);
            if (localStorage.getItem("school") === "atguigu") {
              next();
            } else {
              alert("暂无权限查看");
            }
          },
        },
        {
          name: "xiaoxi",
          path: "message",
          component: Message,
          meta: { title: "消息" },
          children: [
            {
              name: "xiangqing",
              path: "detail",
              component: Detail,
              meta: { title: "详情" },
              props($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                };
              },
            },
          ],
        },
      ],
    },
  ],
});

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
  console.log("后置路由守卫", to, from);
  document.title = to.meta.title || "硅谷系统";
});

//导出路由器
export default router;
```

3.  组件内守卫

```javascript
<template>
    <h2>我是About组件的内容</h2>
</template>

<script>
    export default {
        name:'About',
        // 通过路由规则，离开该组件时被调用
        beforeRouteEnter (to, from, next) {
            console.log('About--beforeRouteEnter',to,from)
            if(localStorage.getItem('school')==='atguigu'){
                next()
            }else{
                alert('学校名不对，无权限查看！')
            }
        },
        // 通过路由规则，离开该组件时被调用
        beforeRouteLeave (to, from, next) {
            console.log('About--beforeRouteLeave',to,from)
            next()
        }
    }
</script>
```

## 路由器的两种工作模式

1. 对于一个 url 来说，什么是 hash 值？ `#及其后面的内容就是 hash 值`
2. hash 值不会包含在 HTTP 请求中，即：`hash 值不会带给服务器`
3. hash 模式
   a. 地址中永远带着#号，不美观
   b. 若以后将地址通过第三方手机 app 分享，若 app 校验严格，则地址会被标记为不合法
   c. 兼容性较好
4. history 模式
   a. 地址干净，美观
   b. 兼容性和 hash 模式相比略差
   c. 应用部署上线时需要后端人员支持，解决刷新页面服务端 404 的问题

```javascript
const router =  new VueRouter({
	mode:'history',
	routes:[...]
})

export default router
```
