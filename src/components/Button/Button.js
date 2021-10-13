import React from "react";
import "./Button.css";

export class Button extends React.Component {
  render() {
    return (
      <button className={this.props.class} onClick={this.props.onClick}>
        {this.props.value.toUpperCase()}
      </button>
    );
  }
}
