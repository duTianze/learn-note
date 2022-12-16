import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 完整形式
  // render(createElement){
  //   return createElement(App)
  // }
}).$mount("#app");
