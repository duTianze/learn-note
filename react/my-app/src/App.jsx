//创建外壳组件APP
import React, { Component } from "react";
import "./App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import List from "./component/List";

class App extends Component {
    state = {
        todos: [
            { id: 1, name: "吃饭", done: true },
            { id: 2, name: "睡觉", done: false },
            { id: 3, name: "打代码", done: true },
        ],
    };

    addTodo = (todoObj) => {
        const { todos } = this.state;
        const newTodos = [todoObj, ...todos];
        this.setState({ todos: newTodos });
    };

    //根据id,修改状态中是否被选中
    checked = (id, checked) => {
        const { todos } = this.state;
        // todos.map((todo)=>{
        //     if(todo.id == id){
        //         todo.done = checked;
        //     }
        //     return null;
        // })
        // this.setState({todos:[...todos]})
        const newTodo = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, done: checked };
            }
            return todo;
        });
        this.setState({ todos: newTodo });
    };

    //点击删除按钮，删除其中一行
    deleteById = (id) => {
        const { todos } = this.state;
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        const newTo = todos.filter((todo) => {
            return todo.id !== id;
        });
        this.setState({ todos: newTo });
    };

    //全选
    choseAll = (done) => {
        const { todos } = this.state;

        const newTo = todos.map((todo) => {
            return { ...todo, done };
        });
        this.setState({ todos: [...newTo] });
    };

    //删除选中的内容
    Alldelete = () => {
        const { todos } = this.state;
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        const newTo = todos.filter((todo) => {
            return todo.done !== true;
        });
        this.setState({ todos: newTo });
    };

    render() {
        const { todos } = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List
                        todos={todos}
                        show={this.checked}
                        deleteById={this.deleteById}
                    />
                    <Footer
                        allCheck={this.state}
                        choseAll={this.choseAll}
                        Alldelete={this.Alldelete}
                    />
                </div>
            </div>
        );
    }
}

export default App;
