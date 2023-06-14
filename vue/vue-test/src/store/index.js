import Vue from "vue";
import Vuex from "vuex";
import countOptions from "./count"; // 引入count
import personOptions from "./person"; // 引入person

Vue.use(Vuex);

//创建并暴露store
export default new Vuex.Store({
  modules: {
    countAbout: countOptions,
    personAbout: personOptions,
  },
});
