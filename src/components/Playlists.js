import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assests/playlist.css";

function PlaylistsItems({ d }) {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <ul
      onClick={() => {
        setChecked(!checked);
      }}
    >
      {checked && navigate("/lyrics", { state: { playlists: d } })}
      <div className="gallery">
        <Image draggable={false} src={d.images[0].url} />
      </div>
    </ul>
  );
}

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const getPlaylists = async () => {
      await Axios.get("http://localhost:8000/spotify/getPlaylists")
        .then((res) => {
          const playlistsInfo = res.data.playlists;
          let covers = [];
          playlistsInfo.forEach((info, index) => {
            covers[index] = info.images[0].url;
          });
          setPlaylists(playlistsInfo);
        })
        .catch((err) => console.log(err));
    };
    getPlaylists();
  }, []);
  return (
    <ul>
      {playlists.map((d, index) => {
        return (
          <div key={index}>
            <PlaylistsItems d={d} />
          </div>
        );
      })}
    </ul>
  );
}
