import React, { useState, useEffect } from "react";
import "../style.css";

function LoginForm(props) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [loginStatus, setLoginStatus] = useState("")
  function handleInputUsername(e) {
    setUsername(e.target.value);
  }
  function handleInputPassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    let authApiUrl = "http://localhost:5000/auth";
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

      fetch(authApiUrl, {method: "POST", body: formData})
      .then((res)=> res.json())
      .catch((error)=> console.error('请求出现了问题：',error))
      .then((response)=>{
        setLoginStatus(response.loginStatus)
       console.log('fetchInfo:', response) 
      })
      e.preventDefault()
    } 
  
  useEffect(() => {
    console.log(`重新render了 ${username}, ${password}`);
  });

  return (
    <form onSubmit={(e)=>{handleSubmit(e)}}>
      <label className="my-label">用户名：</label>
      <br />
      <input
        type="text"
        onChange={(e) => {
          handleInputUsername(e);
        }}
        value={username}
      ></input>
      <label className="my-label">密码：</label>
      <br />
      <input
        type="password"
        onChange={(e) => {
          handleInputPassword(e);
        }}
        value={password}
      ></input>
      <button>确定</button>
    </form>
  );
}

export default LoginForm;
