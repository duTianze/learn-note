import Vue from "vue"; // 引入Vue核心库
import Vuex from "vuex"; // 引入Vuex

Vue.use(Vuex); // 应用Vuex插件

// 准备actions对象——响应组件中用户的动作
const actions = {
  addOdd(context, value) {
    console.log("actions中的addOdd被调用了");
    if (context.state.sum % 2) {
      context.commit("ADD", value);
    }
  },
  addWait(context, value) {
    console.log("actions中的addWait被调用了");
    setTimeout(() => {
      context.commit("ADD", value);
    }, 500);
  },
};
// 准备mutations对象——修改state中的数据
const mutations = {
  ADD(state, value) {
    state.sum += value;
  },
  SUB(state, value) {
    state.sum -= value;
  },
};
// 准备state对象——保存具体的数据
const state = {
  sum: 0, // 当前的和
};
// 准备getters对象——用于将state中的数据进行加工
const getters = {
  bigSum() {
    return state.sum * 10;
  },
};

//创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
});
