import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Image } from "semantic-ui-react";
import Axios from "axios";
import background from "./../assests/Web-Header-Background-1.svg";
import "./style.css";

export default function Homepage() {
  const [playlists, setPlaylists] = useState([]);
  const [images, setImages] = useState([]);
  const [picture, setPicture] = useState(false);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      paritialVisibilityGutter: 60,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };

  useEffect(() => {
    const getPlaylists = async () => {
      await Axios.get("http://localhost:8000/spotify/getPlaylists")
        .then((res) => {
          const playlistsInfo = res.data.playlists;
          let covers = [];
          playlistsInfo.forEach((info, index) => {
            covers[index] = info.images[0].url;
          });
          setImages(covers);
          setPicture(true);
          setPlaylists(playlistsInfo);
        })
        .catch((err) => console.log(err));
    };
    getPlaylists();
  }, []);

  console.log(images);

  return (
    <div>
      {picture && (
        <Carousel
          ssr
          deviceType="desktop"
          itemClass="image-item"
          responsive={responsive}
        >
          {images.map((image) => {
            return (
              <Image
                key={image}
                draggable={false}
                style={{ width: "100%", height: "100%" }}
                src={image}
              />
            );
          })}
        </Carousel>
      )}
    </div>
  );
}

// <img src={background} alt="text" />

// {
//   picture && (
//     <Carousel ssr itemClass="image-item" responsive={responsive}>
//       {images.map((image) => {
//         return (
//           <Image
//             draggable={false}
//             style={{ width: "100%", height: "100%" }}
//             src={image}
//           />
//         );
//       })}
//     </Carousel>
//   )
// }
