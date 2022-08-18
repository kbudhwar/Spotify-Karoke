import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import "../assests/style.css";
import TypeWriter from "react-typewriter-effect";
import Header from "./Header";

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
        <div className="gradient"/>
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
            text="Welcome to Heardle!"
            typeSpeed={50}
          />
        </div>
        <Header />
      </div>
    );
  }
}

export default Wallpaper;
