import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import "./style.css";
import TypeWriter from "react-typewriter-effect";

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
        <div className="title">
          <TypeWriter
            textStyle={{
              fontFamily: "Nunito",
              color: "#ffffff",
              fontWeight: 1000,
              fontSize: "4em",
            }}
            startDelay={100}
            cursorColor="white"
            text="Welcome to Name!"
            typeSpeed={50}
          />
        </div>
      </div>
    );
  }
}

export default Wallpaper;
