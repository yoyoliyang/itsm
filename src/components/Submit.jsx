import React, { Component } from "react";

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <input type="submit" value={this.props.value} />;
  }
}

export default Submit;
