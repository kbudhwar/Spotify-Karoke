import React, { useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import Axios from "axios";
import "../components/style.css";

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("loggedin: ", loggedIn);
  });

  // Needs to be fixed
  const handleSubmit = async () => {
    /*
    fetch("http://localhost:8000/auth/spotify")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    */
    await fetch("http://localhost:8000/api")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setLoggedIn(true);
  };

  return (
    <>
      {!loggedIn && (
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
      )}
    </>
  );
}

export default Header;
