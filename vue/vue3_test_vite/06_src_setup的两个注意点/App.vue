<template>
  <!--vue3的组件模版结构可以没有根标签-->
  <Demo @hello="showHelloMsg" msg="hello" school="wust">
    <template v-slot:qwe> test1 </template>
    <template v-slot:asd> test2 </template>
  </Demo>
</template>

<script>
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: { Demo },
  setup() {
    return {
      showHelloMsg(value) {
        alert(`你好,${value}`);
      },
    };
  },
};
</script>