import Vue from "vue";
import App from "./App.vue";
import plugins from "./plugins"; // 引入插件

Vue.config.productionTip = false;

Vue.use(plugins, 1, 2, 3); // 应用（使用）插件

new Vue({
  el: "#app",
  render: (h) => h(App),
});
