import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router"; // 引入VueRouter
import router from "./router"; // 引入路由器

Vue.config.productionTip = false;

Vue.use(VueRouter); // 应用插件

new Vue({
  el: "#app",
  render: (h) => h(App),
  router: router,
});
