import "./../assests/App.css";
import Nav from "./Nav";
import Wallpaper from "./Wallpaper";

function App() {
  return (
    <div className="outerWrap">
      <div className="App">
        {/* <Nav /> */}
        <Wallpaper />
      </div>
      <div className="musicControls">music controls</div>
    </div>
  );
}

export default App;
