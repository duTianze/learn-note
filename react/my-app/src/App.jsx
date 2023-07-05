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

    updateTodo = (id, done) => {
        const { todos } = this.state;
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) {
                return { ...todoObj, done: done };
            } else {
                return todoObj;
            }
        });
        this.setState({ todos: newTodos });
    };

    deleteTodo = (id) => {
        const { todos } = this.state;
        const newTodos = todos.filter((todoObj) => {
            return todoObj.id !== id;
        });
        this.setState({ todos: newTodos });
    };

    checkAllTodo = (done) => {
        const { todos } = this.state;
        const newTodos = todos.map((todo) => {
            return { ...todo, done };
        });
        this.setState({ todos: newTodos });
    };

    clearAllDone = () => {
        const { todos } = this.state;
        const newTodos = todos.filter((todo) => {
            return !todo.done;
        });
        this.setState({ todos: newTodos });
    };

    render() {
        const { todos } = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header addTodo={this.addTodo} />
                    <List
                        todos={todos}
                        updateTodo={this.updateTodo}
                        deleteTodo={this.deleteTodo}
                    />
                    <Footer
                        todos={todos}
                        checkAllTodo={this.checkAllTodo}
                        clearAllDone={this.clearAllDone}
                    />
                </div>
            </div>
        );
    }
}

export default App;
