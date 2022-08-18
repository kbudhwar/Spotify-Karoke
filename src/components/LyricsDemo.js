import React, { useEffect, useState } from "react";
import Axios from "axios";
import ParticlesBg from "particles-bg";
import { useLocation } from "react-router-dom";
import Player from "./Player";
import "../assests/lyrics.css";
export default function LyricsDemo() {
  const [lyrics, setLyrics] = useState(undefined);
  const [track, setTrack] = useState(undefined);

  const location = useLocation();
  const playlist = location.state.playlists;
  useEffect(() => {
    if (track !== undefined) {
      const getLyrics = async () => {
        await Axios.get("http://localhost:8000/spotify/lyrics", {
          params: {
            name: track.name,
            artist: track.artists[0].name,
          },
        }).then((res) => {
          let verses = [];
          verses = res.data.lyrics.split("\n\n");
          while (true) {
            let x = Math.floor(Math.random() * verses.length);
            let total = verses[x].split("\n").length;
            if (total >= 4) {
              setLyrics(verses[x]);
              break;
            }
          }
        });
      };
      getLyrics();
    } else {
      const getTrack = async () => {
        let tracks = [];
        await Axios.get("http://localhost:8000/spotify/getPlaylistTracks", {
          params: {
            id: playlist.id,
          },
        })
          .then((res) => {
            tracks = res.data.tracks;
          })
          .catch((err) => console.log(err));

        let x = Math.floor(Math.random() * 100);
        console.log(tracks[x]);
        setTrack(tracks[x].track);
      };
      getTrack();
    }
  }, [track]);

  return (
    <div>
      <ParticlesBg num={100} type="circle" bg={true} />
      {lyrics && (
        <>
          <div className="attributes">
            {track.name} {" by"} {track.artists[0].name}
          </div>
          <pre>{lyrics}</pre>
          <Player trackUri={track.uri} />
        </>
      )}
    </div>
  );
}

// Fix the Warning on this page - follow stack
