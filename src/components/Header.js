import React, { useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import Axios from "axios";
import "./../assests/style.css";

function Header() {
  const handleSubmit = async () => {};

  return (
    <>
      <Navbar className="header">
        <Button
          className="signup btns"
          variant="outline-light"
          size="lg"
          href="https://www.spotify.com/us/signup"
        >
          Signup for Spotify
        </Button>
        <Button
          className="login btns"
          variant="outline-light"
          size="lg"
          href="http://localhost:8000/auth/spotify"
          onClick={handleSubmit}
        >
          Login with Spotify
        </Button>
      </Navbar>
    </>
  );
}

export default Header;
