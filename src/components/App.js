import "./../assests/App.css";
import Nav from "./Nav";
import Wallpaper from "./Wallpaper";
import Header from "./Header";

function App() {
  return (
    <div className="outerWrap">
      <div className="App">
        {/* <Nav /> */}
        <Nav />
        <Header />
        <Wallpaper />
      </div>
      <div className="musicControls">music controls</div>
    </div>
  );
}

export default App;
