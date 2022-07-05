import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import TypeWriter from "react-typewriter-effect";
import Playlists from "./Playlists";
import "../assests/style.css";

class Begin extends Component {
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
        <div className="title-choose-playlist">
          <TypeWriter
            textStyle={{
              fontFamily: "Nunito",
              color: "#ffffff",
              fontWeight: 100,
              fontSize: "2em",
            }}
            startDelay={100}
            cursorColor="white"
            text="To begin choose a playlist below..."
            typeSpeed={50}
          />
        </div>
        <Playlists />
      </div>
    );
  }
}

export default Begin;
