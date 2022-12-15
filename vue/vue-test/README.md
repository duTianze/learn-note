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
