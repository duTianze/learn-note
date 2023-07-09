import React, { Component } from "react";
import "./index.css";

export default class List extends Component {
    render() {
        const { users, isFirst, isLoading, error } = this.props;
        return (
            <div className="row">
                {isFirst ? (
                    <h2>请输入关键词以搜索用户</h2>
                ) : isLoading ? (
                    <h2>Loading...</h2>
                ) : error ? (
                    <h2 style={{ color: "red" }}>{error}</h2>
                ) : (
                    users.map((userObj) => (
                        <div key={userObj.id} className="card">
                            <a
                                rel="noreferrer"
                                href={userObj.html_url}
                                target="_blank"
                            >
                                <img
                                    src={userObj.avatar_url}
                                    alt="head_portrait"
                                    style={{ width: "100px" }}
                                />
                                <p className="card_text">{userObj.login}</p>
                            </a>
                        </div>
                    ))
                )}
            </div>
        );
    }
}
