import React, { useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
import Axios from "axios";
import "../assests/playlist.css";
import "../assests/WithScrollbar.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

function PlaylistsItems({ d }) {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  return (
    <ul
      onClick={() => {
        setChecked(!checked);
      }}
    >
      {checked
        ? navigate("/lyrics", { state: { playlists: d } })
        : console.log("false")}
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
      {playlists.map((d) => {
        return (
          <div>
            <PlaylistsItems d={d} />
          </div>
        );
      })}
    </ul>
  );
}
