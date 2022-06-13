import React, { Component } from "react";
import { render } from "react-dom";
import ParticlesBg from "particles-bg";
import "./style.css";

class Wallpaper extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
  }

  render() {
    return (
      <div>
        <ParticlesBg num={100} type="circle" bg={true} />
      </div>
    );
  }
}

export default Wallpaper;
