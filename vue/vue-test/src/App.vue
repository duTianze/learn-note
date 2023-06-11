<template>
  <div>
    <button @click="getStudents">获取学生信息</button>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    // npm install -g json-server
    // json-server --watch --port 5000 ./src/students.json
    // json-server --watch --port 5001 ./src/cars.json
    getStudents() {
      axios.get("http://localhost:8080/api1/students").then(
        (response) => {
          console.log("请求成功了", response.data);
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
    getCars() {
      axios.get("http://localhost:8080/api2/cars").then(
        (response) => {
          console.log("请求成功了", response.data);
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
  },
};
</script>