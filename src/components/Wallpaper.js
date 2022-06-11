import React from "react";
import videoBG from "./../assests/Background.mp4";

const Wallpaper = () => {
  return (
    <div className="GradientVideo">
      <video src={videoBG} autoPlay loop muted />
    </div>
  );
};

export default Wallpaper;
