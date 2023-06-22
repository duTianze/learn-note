<template>
  <!--vue3的组件模版结构可以没有根标签-->
  <Demo />
</template>

<script>
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: { Demo },
  setup() {},
};
</script>