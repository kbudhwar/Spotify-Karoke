import React, { useEffect, useState } from "react";
import Axios from "axios";
import background from "./../assests/Web-Header-Background-1.svg";

function LyricsDemo() {
  useEffect(() => {
    const getTrack = async () => {
      let name, artist;
      await Axios.get("http://localhost:8000/spotify/getTestTrack")
        .then((res) => {
          console.log(res.data);
          artist = res.data.artist;
          name = res.data.name;
        })
        .catch((err) => console.log(err));

      await Axios.get("http://localhost:8000/spotify/lyrics", {
        params: {
          name: name,
          artist: artist,
        },
      }).then((res) => {
        console.log("gotti");
      });
    };
    getTrack();
  }, []);

  return (
    <div>
      <img src={background} alt="text" />
    </div>
  );
}

export default LyricsDemo;

// https://www.youtube.com/watch?v=Xcet6msf3eE&t=3096s
