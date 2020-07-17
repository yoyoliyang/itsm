import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("input组件update");
    console.log(this.props.value);
    // state状态继承父state
    const value = this.props.value;
    return (
      <p>
        <label>{this.props.labelValue}</label>
        <br />
        <input
          type={this.props.inputType}
          className={this.props.className}
          // onInput会触发一个事件（event），将该事件传递给handleInput函数后，利用event.target或event.nativeEvent的内容
          // setState状态继承父setState
          onInput={() => {
            this.props.handleInput();
          }}
          value={value}
        ></input>
      </p>
    );
  }
}

export default Input;
