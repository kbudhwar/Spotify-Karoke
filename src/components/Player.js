import React, { useEffect, useState } from "react";
import Axios from "axios";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ trackUri }) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      await Axios.get("http://localhost:8000/spotify/getToken")
        .then((res) => {
          setToken(res.data.accessToken);
        })
        .catch((err) => {
          console.log("Could not get access token");
          console.log(err);
        });
    };
    getToken();
  }, []);

  if (!token) return null;

  return (
    <SpotifyPlayer
      token={token}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
    />
  );
}

// Might have to change some things so if code is expired,
// it uses the refresh code to make it work instead of
// returning errors
