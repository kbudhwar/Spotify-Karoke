import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import reportWebVitals from "./test/reportWebVitals";
import App from "./components/App";
import Wallpaper from "./components/Wallpaper";
import LyricsDemo from "./components/LyricsDemo";
import Begin from "./components/Begin";
import "./index.css";

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router history={history}>
    <Routes>
      <Route exact path="/" element={<Wallpaper />}></Route>
      <Route exact path="/in" element={<Begin />}></Route>
      <Route exact path="/lyrics" element={<Begin />}></Route>
      <Route exact path="/lyricsDemo" element={<LyricsDemo />}></Route>
    </Routes>
  </Router>
);

/*
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
