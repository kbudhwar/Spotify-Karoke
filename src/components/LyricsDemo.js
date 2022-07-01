import React, { useEffect, useState } from "react";
import Axios from "axios";
import ParticlesBg from "particles-bg";
import "../assests/lyrics.css";
import { useLocation } from "react-router-dom";

export default function LyricsDemo() {
  const [lyrics, setLyrics] = useState("");
  const [artistPrint, setArtist] = useState("");
  const [namePrint, setName] = useState("");

  const location = useLocation();
  const playlist = location.state.playlists;
  let name = "";
  let artist = "";
  useEffect(() => {
    const getTrack = async () => {
      let tracks = [];
      await Axios.get("http://localhost:8000/spotify/getPlaylistTracks", {
        params: {
          id: playlist.id,
        },
      })
        .then((res) => {
          console.log(res.data);
          tracks = res.data;
        })
        .catch((err) => console.log(err));

      let x = Math.floor(Math.random() * 100);

      artist = tracks.tracks.items[x].track.artists[0].name;
      console.log(artist);
      name = tracks.tracks.items[x].track.name;
      setArtist(artist);
      setName(name);

      await Axios.get("http://localhost:8000/spotify/lyrics", {
        params: {
          name: name,
          artist: artist,
        },
      }).then((res) => {
        setLyrics(res.data.lyrics);
      });
    };
    getTrack();
  }, []);
  return (
    <div>
      <ParticlesBg num={100} type="circle" bg={true} />
      <div className="attributes">
        {namePrint}
        {" by"} {artistPrint}
      </div>
      <pre>{lyrics}</pre>
    </div>
  );
}
