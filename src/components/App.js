import logo from "./../assests/logo.svg";
import "./../assests/App.css";
import Nav from "./Nav";

function App() {
  return (
    <div className="outerWrap">
      <div className="App">
        <Nav />
      </div>
      <div className="musicControls">music controls</div>
    </div>
  );
}

export default App;
