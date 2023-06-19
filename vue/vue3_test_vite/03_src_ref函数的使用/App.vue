<template>
  <!--vue3的组件模版结构可以没有根标签-->
  <h1>我是app组件</h1>
  <h1>我叫{{ name }}, {{ age }}岁</h1>
  <h3>职位:{{ job.type }}</h3>
  <h3>薪水:{{ job.salary }}</h3>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    // 数据
    const name = ref("张三");
    const age = ref(18);
    const job = ref({
      type: "frontend developer",
      salary: "30",
    });

    // 方法
    function changeInfo() {
      name.value = "李四";
      age.value = 42;
      job.value.type = "UI developer";
    }

    //返回一个对象
    return {
      name,
      age,
      job,
      changeInfo,
    };
  },
};
</script>