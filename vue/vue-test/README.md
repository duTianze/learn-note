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