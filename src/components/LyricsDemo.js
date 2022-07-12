import React, { useEffect, useState } from "react";
import Axios from "axios";
import ParticlesBg from "particles-bg";
import { useLocation } from "react-router-dom";
import Player from "./Player";
import "../assests/lyrics.css";

const TrackSegment = ({ verse }) => {
  return <div> {verse} </div>;
};

export default function LyricsDemo() {
  const [lyrics, setLyrics] = useState(undefined);
  const [track, setTrack] = useState(undefined);
  const [verses, setVerses] = useState([]);

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
          console.log(res.data.lyrics);
          setLyrics(res.data.lyrics);
          /*
          let verses = [];
          verses = res.data.lyrics.split("\n\n");
          console.log(verses);
          while (true) {
            let x = Math.floor(Math.random() * verses.length);
            let total = verses[x].split("\n").length;
            if (total >= 4) {
              setLyrics(res.data.lyrics);
              break;
            }
          }
          */
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
        setTrack(tracks[x].track);
      };
      getTrack();
    }
  }, [track]);

  useEffect(() => {
    if (lyrics !== undefined) {
      console.log(lyrics.split("\n\n"));
      setVerses(lyrics.split("\n\n"));
    } else {
      return;
    }
  }, [lyrics]);

  return (
    <div>
      <ParticlesBg num={100} type="circle" bg={true} />
      {lyrics && (
        <>
          <div className="attributes">
            {track.name} {" by"} {track.artists[0].name}
          </div>
          <pre> {verses[0]}</pre>
          {/* <pre>
            {verses.map((verse, index) => {
              <TrackSegment key={index} verse={verse} />;
            })}
          </pre> */}
          <Player trackUri={track.uri} />
        </>
      )}
    </div>
  );
}

// Fix the Warning on this page - follow stack
