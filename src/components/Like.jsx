import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleInput(e) {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return <input onInput={(e) => this.handleInput(e)}></input>;
  }
}

export default Input;
