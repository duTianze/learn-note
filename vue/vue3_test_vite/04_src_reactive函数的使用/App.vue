<template>
  <!--vue3的组件模版结构可以没有根标签-->
  <h1>我是app组件</h1>
  <h1>我叫{{ person.name }}, {{ person.age }}岁</h1>
  <h3>职位:{{ person.type }}</h3>
  <h3>薪水:{{ person.salary }}</h3>
  <h3>爱好:{{ person.hobbies }}</h3>
  <h4>测试的数据c:{{ person.a.b.c }}</h4>
  <button @click="changeInfo">修改人的信息</button>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "App",
  setup() {
    const person = reactive({
      name: "py",
      age: 21,
      type: "frontend developer",
      salary: "30",
      hobbies: ["抽烟", "喝酒", "烫头"],
      a: {
        b: {
          c: 666,
        },
      },
    });

    function changeInfo() {
      person.name = "李四";
      person.age = 42;
      person.type = "UI developer";
      person.a.b.c = 100;
      person.hobbies[0] = "学习";
    }

    return {
      person,
      changeInfo,
    };
  },
};
</script>