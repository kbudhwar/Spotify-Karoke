import React from "react";
import { Button, Navbar } from "react-bootstrap";
import Axios from "axios";
import "./../assests/Header.css";

function Header() {
  // Needs to be fixed
  const handleSubmit = async () => {
    fetch("http://localhost:8000/auth/spotify")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    /*
    fetch("http://localhost:8000/api")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    */
  };

  return (
    <>
      <Navbar style={{ display: "flex" }} bg="dark" variant="dark" fixed="top">
        <Button
          className="btns float-right"
          variant="success"
          href="https://www.spotify.com/us/signup"
        >
          Signup
        </Button>
        <Button
          className="btns float-right"
          variant="outline-light"
          href="http://localhost:8000/auth/spotify"
        >
          Login
        </Button>
      </Navbar>
    </>
  );
}

export default Header;
