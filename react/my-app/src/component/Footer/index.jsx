import React, { Component } from "react";
import "./index.css";
class Footer extends Component {
    handleCheckAll = (event) => {
        this.props.checkAllTodo(event.target.checked);
    };

    handleClearAllDone = () => {
        this.props.clearAllDone();
    };

    render() {
        const { todos } = this.props;
        const doneCount = todos.reduce(
            (pre, todo) => pre + (todo.done ? 1 : 0),
            0
        );

        return (
            <div className="todo-footer">
                <label>
                    <input
                        onChange={this.handleCheckAll}
                        type="checkbox"
                        checked={
                            doneCount === todos.length && todos.length !== 0
                                ? true
                                : false
                        }
                    />
                </label>
                <span>
                    <span>已完成{doneCount}</span> / 全部{todos.length}
                </span>
                <button
                    onClick={this.handleClearAllDone}
                    className="btn btn-danger"
                >
                    清除已完成任务
                </button>
            </div>
        );
    }
}

export default Footer;
