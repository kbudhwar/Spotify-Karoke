import React, { useEffect, useState } from "react";
import { Button, Navbar } from "react-bootstrap";
import Axios from "axios";

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
        <Navbar className="header" bg="dark" variant="dark" fixed="top">
          <Button
            className="signup btns"
            variant="outline-info"
            href="https://www.spotify.com/us/signup"
          >
            Signup
          </Button>
          <Button
            className="login btns"
            variant="outline-light"
            href="http://localhost:8000/auth/spotify"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Navbar>
      )}
    </>
  );
}

export default Header;
