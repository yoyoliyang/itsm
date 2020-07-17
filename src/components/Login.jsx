import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLoaded: false,
      // error: null,
      username: "",
      password: "",
      loginStatus: "",
    };
  }
  handleInput(e) {
    // console.log(e.nativeEvent);
    // 注意 setState是一个固有的函数，用来改变state的值
    e.target.name === "username"
      ? this.setState({ username: e.target.value })
      : this.setState({ password: e.target.value });
  }
  handleSubmit(e) {
    let authApiUrl = "http://localhost:5000/auth";
    let formData = new FormData();

    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    // fetch如果前端和后端不在一个站，那么需要在后端webserver开启CORS
    fetch(authApiUrl, {
      method: "POST", // or 'PUT'
      body: formData, // 请求表单类型数据
    })
      .then((res) => res.json())
      .catch((error) => console.error("请求出现了问题:", error))
      .then((response) => {
        response.loginStatus === "suc"
          ? this.setState({ loginStatus: response.loginStatus })
          : this.setState({ loginStatus: response.loginStatus });
        console.log("fetchInfo:", response);
      });
    // 测试用，禁止默认行为
    e.preventDefault();
  }

  render() {
    return (
      <form
        className="form-signin"
        onSubmit={(e) => {
          this.handleSubmit(e);
        }}
      >
        <p>
          <label>用户名：</label>
          <br />
          <input
            className="form-control"
            type="text"
            onChange={(e) => {
              this.handleInput(e);
            }}
            name="username"
            value={this.state.username}
          />
        </p>
        <p>
          <label>密码：</label>
          <br />
          <input
            className="form-control"
            type="password"
            onChange={(e) => {
              this.handleInput(e);
            }}
            name="password"
            value={this.state.password}
          />
        </p>
        <button type="submit">提交</button>
      </form>
    );
  }
}

export default Login;
