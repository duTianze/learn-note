//创建外壳组件APP
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    // json-server --watch --port 5000 ./src/students.json
    getStudentData = () => {
        axios.get("http://localhost:3000/students").then(
            (response) => console.log("成功了", response.data),
            (error) => console.log("失败了", error)
        );
    };

    render() {
        return (
            <div>
                <button onClick={this.getStudentData}>
                    点击我获取学生数据
                </button>
            </div>
        );
    }
}

export default App;
