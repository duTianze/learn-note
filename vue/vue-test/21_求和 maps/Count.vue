<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和的10倍为：{{ bigSum }}</h3>
    <h3>我是{{ name }}，我在{{ school }}学习</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="addOdd(n)">当前求和为奇数再加</button>
    <button @click="addWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex"; //🔴

export default {
  name: "Count",
  data() {
    return {
      n: 1, //用户选择的数字
    };
  },
  computed: {
    ...mapState(["sum", "school", "name"]),
    ...mapGetters(["bigSum"]),
  },
  methods: {
    ...mapMutations({ increment: "ADD", decrement: "SUBTRACT" }),
    ...mapActions(["addOdd", "addWait"]),
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>