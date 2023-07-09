import React, { Component } from "react";
import axios from "axios";

export default class Search extends Component {
    search = () => {
        const { value } = this.keyWordElement;
        this.props.updateAppState({ isFirst: false, isLoading: true });
        axios
            .get(`https://api.github.com/search/users?q=${value}`)
            .then((response) => {
                this.props.updateAppState({
                    isLoading: false,
                    users: response.data.items,
                });
            })
            .catch((error) => {
                this.props.updateAppState({
                    isLoading: false,
                    error: error.message,
                });
            });
    };

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">搜索github用户</h3>
                <div>
                    <input
                        type="text"
                        placeholder="请输入关键字"
                        ref={(c) => (this.keyWordElement = c)}
                    />
                    &nbsp;
                    <button onClick={this.search}>搜素</button>
                </div>
            </section>
        );
    }
}
