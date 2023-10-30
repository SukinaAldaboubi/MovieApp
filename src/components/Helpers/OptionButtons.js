import React, { Component } from "react";

export class OptionButtons extends Component {
  constructor() {
    super();
    this.state = {
      selected: "btn1",
    };
  }

  changeColor = (btn) => {
    this.setState({ selected: btn });
  };

  render() {
    return (
      <>
        <button
          id="trending-option"
          className={
            this.state.selected === "btn1" ? "selected" : "notSelected"
          }
          onClick={() => this.changeColor("btn1")}
        >
          Today
        </button>
        <button
          id="trending-option"
          className={
            this.state.selected === "btn2" ? "selected" : "notSelected"
          }
          onClick={() => this.changeColor("btn2")}
        >
          This week
        </button>
      </>
    );
  }
}
