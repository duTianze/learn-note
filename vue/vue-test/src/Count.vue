<template>
  <div>
    <h1>当前求和为6666: {{ sum }}</h1>
    <h3>当前求和的10倍为: {{ bigSum }}</h3>
    <h3>我是{{ name }}，我在{{ school }}学习</h3>
    <h3 style="color: red">Person组件的总人数是: {{ personList.length }}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Count",
  data() {
    return {
      n: 1, // 用户选择的数字
    };
  },
  computed: {
    ...mapState("countAbout", ["sum", "school", "name"]),
    ...mapState("personAbout", ["personList"]),
    ...mapGetters("countAbout", ["bigSum"]),
  },
  methods: {
    ...mapMutations("countAbout", { increment: "ADD", decrement: "SUBTRACT" }),
    ...mapActions("countAbout", {
      incrementOdd: "addOdd",
      incrementWait: "addWait",
    }),
  },
};
</script>

<style>
button {
  margin-left: 5px;
}
</style>