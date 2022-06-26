import React, { useEffect, useState } from "react";
import Axios from "axios";
import ParticlesBg from "particles-bg";
import "../assests/style.css";
import { useLocation } from "react-router-dom";

export default function LyricsDemo() {
  const [lyrics, setLyrics] = useState("");
  const location = useLocation();
  const playlist = location.state.playlists;
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
        console.log("here");
        setLyrics(res.data.lyrics);
      });
    };
    getTrack();
  }, []);
  return (
    <div>
      <ParticlesBg num={100} type="circle" bg={true} />
      <pre>{lyrics}</pre>
    </div>
  );
}
