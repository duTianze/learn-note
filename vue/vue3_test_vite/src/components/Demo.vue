<template>
  <h1>我是app组件</h1>
  <h1>我叫{{ person.name }}, {{ person.age }}岁</h1>
  <button @click="test">测试触发一次demo的自定义事件</button>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Demo",
  beforeCreate() {
    console.log("----@bc");
  },
  props: ["msg", "school"],
  emits: ["hello"],
  setup(props, context) {
    console.log(props); //props: 外部给组件丢的参数 => 响应式(Proxy实例)
    // console.log(context, context.attrs); 相当于vue2中的$attrs
    // console.log(context,context.slots); 插槽

    let person = reactive({
      name: "张三",
      age: 18,
    });

    return {
      person,
      test() {
        context.emit("hello", 666); //触发自定义事件
      },
    };
  },
};
</script>

<style>
</style>