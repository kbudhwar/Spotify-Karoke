import React, { useEffect, useState } from "react";
import Axios from "axios";
import background from "./../assests/Web-Header-Background-1.svg";
import "../assests/style.css";

function LyricsDemo() {
  const [lyrics, setLyrics] = useState("");
  let name, artist;
  function getTrack() {
    Axios.get("http://localhost:8000/spotify/getTestTrack")
      .then((res) => {
        console.log("here");
        console.log(res.data);
        artist = res.data.artist;
        name = res.data.name;
      })
      .catch((err) => console.log(err));
  }
  function searchLyrics() {
    Axios.get(`https://api.lyrics.ovh/v1/${artist}/${name}`).then((res) => {
      console.log(res.data.lyrics);
      setLyrics(res.data.lyrics);
    });
  }

  return (
    <div>
      {getTrack()}
      {searchLyrics()}
      <pre>{lyrics}</pre>
    </div>
  );
}

//export default LyricsDemo;

// function searchLyrics() {
//   Axios.get(`https://api.lyrics.ovh/v1/Avicii/Levels`).then((res) => {
//     console.log(res.data.lyrics);
//     setLyrics(res.data.lyrics);
//   });
// }

// return (
//   <div>
//     {searchLyrics()}
//     <pre>{lyrics}</pre>
//   </div>
// );

// function LyricsDemo() {
// useEffect(() => {
//   const getTrack = async () => {
//     let name, artist;
//     await Axios.get("http://localhost:8000/spotify/getTestTrack")
//       .then((res) => {
//         console.log(res.data);
//         artist = res.data.artist;
//         name = res.data.name;
//       })
//       .catch((err) => console.log(err));

//     await Axios.get("http://localhost:8000/spotify/lyrics", {
//       params: {
//         name: name,
//         artist: artist,
//       },
//     }).then((res) => {
//       console.log("gotti");
//     });
//   };
//   getTrack();
// }, []);

//   return (
//     <div>
//       <img src={background} alt="text" />
//     </div>
//   );
// }

export default LyricsDemo;
